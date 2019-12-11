drop schema if exists rtesseract cascade;
create schema rtesseract;

create table rtesseract.rtesseract_word (
page_ark text,
num integer,
"left" integer,
top integer,
"right" integer,
bottom integer,
text text,
confidence float
);

-- There are some bad wods in this setup.
delete from rtesseract.rtesseract_words where "left"=0 and top=0;

copy rtesseract.word from 'io/Rtesseract_words.csv' with csv;

create materialized view rtesseract.word as
select
page_ark ||'-'||num as word_id,
page_ark,
st_setsrid(st_makebox2d(st_makepoint("left",-top),st_makepoint("right",-bottom)),32662) as bbox,
text,
confidence
from rtesseract.rtesseract_word;

create index word_bbox on rtessearct.word USING GIST(bbox);
create index word_page_ark on rtesseract.word(page_ark);

drop schema if exists tesseract;
create schema tesseract;

create table tesseract.hocr (
ark text,
rotation float,
hocr jsonb
);

COPY tesseract.hocr (ark,rotation,hocr) from 'io/hocr.tsv';

create materialized view tesseract.pages as
with c as ( select
 ark,
 regexp_split_to_array((regexp_matches(hocr->0->>'title','(bbox([\s\d])+);'))[1],' ') as b,
 hocr->0 as json
 from tesseract.hocr
),
a as (select ark,json,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
 row_number() over () as page_id,
 ark as page_ark,json->>'id' as page,json,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.carea as
with c as ( select
 page_id,page_ark,
 jsonb_array_elements(json->'children') as json
 from tesseract.pages
),
a as (select *,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
 row_number() over () as carea_id,
 page_id,page_ark,json->>'id' as carea,json,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.par as
with c as (select
 page_id,carea_id,page_ark,
 jsonb_array_elements(json->'children') as json
from tesseract.carea
),
a as (select *,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
row_number() over () as par_id,
page_id,carea_id,page_ark,json->>'id' as par,
json,
st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.line as
with c as (select
 page_id,carea_id,par_id,page_ark,
 jsonb_array_elements(json->'children') as json
from tesseract.par),
a as (select *,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
 row_number() over () as line_id,
 page_id,carea_id,par_id,page_ark,json->>'id' as line,
 (regexp_matches(json->>'title','baseline ((-?[.\d]+) (-?[.\d]+))'))[1] as baseline,
 json,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.words as
with c as (
select
 page_id,carea_id,par_id,line_id,page_ark,
 jsonb_array_elements(json->'children') as json
from tesseract.line
),
a as (select *,
 json->>'text' as text,
 (regexp_matches(json->>'title','x_wconf (\d+)'))[1] as x_wconf,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
 row_number() over () as word_id,
 page_id,carea_id,par_id,line_id,page_ark,json->>'id' as word,
 text,
 x_wconf,
 json,
 b[5]::integer-b[3]::integer as height,b[4]::integer-b[2]::integer as length,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a
where text is not null;

create index words_page_ark on tesseract.words(page_ark);
create index words_line_id on tesseract.words(line_id);

create or replace function text (l in tesseract.line, out t text)
LANGUAGE SQL IMMUTABLE AS $$
select string_agg(w->>'text',' ') as t from jsonb_array_elements(l.json->'children') w;
$$;

create or replace function text (p in tesseract.par, out t text)
LANGUAGE SQL IMMUTABLE AS $$
select string_agg(w->>'text',' ') as t from
jsonb_array_elements(p.json->'children') l,
LATERAL jsonb_array_elements(l->'children') w ;
$$;

create or replace function text (c in tesseract.carea, out t text)
LANGUAGE SQL IMMUTABLE AS $$
select string_agg(w->>'text',' ') as t from
jsonb_array_elements(c.json->'children') p,
jsonb_array_elements(p->'children') l,
LATERAL jsonb_array_elements(l->'children') w ;
$$;

create or replace function text (g in tesseract.pages, out t text)
LANGUAGE SQL IMMUTABLE AS $$
select string_agg(w->>'text',' ') as t from
jsonb_array_elements(g.json->'children') g,
jsonb_array_elements(g->'children') p,
jsonb_array_elements(p->'children') l,
LATERAL jsonb_array_elements(l->'children') w ;
$$;

create index pages_bbox on tesseract.pages using GIST (bbox);
create index carea_bbox on tesseract.carea using GIST (bbox);
create index par_bbox on tesseract.par using GIST (bbox);
create index line_bbox on tesseract.line using GIST (bbox);
create index words_bbox on tesseract.words using GIST (bbox);

GRANT USAGE ON SCHEMA rtesseract to PUBLIC;
GRANT SELECT ON ALL TABLES IN SCHEMA rtesseract to PUBLIC;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA rtesseract to PUBLIC;
