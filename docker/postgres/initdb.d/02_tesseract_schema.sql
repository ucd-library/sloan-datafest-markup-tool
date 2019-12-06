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
 ark,json->>'id' as page,json,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.carea as
with c as ( select
 page_id,ark,
 jsonb_array_elements(json->'children') as json
 from tesseract.pages
),
a as (select *,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
 row_number() over () as carea_id,
 page_id,ark,json->>'id' as carea,json,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.par as
with c as (select
 page_id,carea_id,ark,
 jsonb_array_elements(json->'children') as json
from tesseract.carea
),
a as (select *,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
row_number() over () as par_id,
page_id,carea_id,ark,json->>'id' as par,
json,
st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.line as
with c as (select
 page_id,carea_id,par_id,ark,
 jsonb_array_elements(json->'children') as json
from tesseract.par),
a as (select *,
 regexp_split_to_array((regexp_matches(json->>'title','(bbox([\s\d])+)'))[1],' ') as b
 from c
)
select
 row_number() over () as line_id,
 page_id,carea_id,par_id,ark,json->>'id' as line,
 (regexp_matches(json->>'title','baseline ((-?[.\d]+) (-?[.\d]+))'))[1] as baseline,
 json,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a;

create materialized view tesseract.words as
with c as (
select
 page_id,carea_id,par_id,line_id,ark,
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
 page_id,carea_id,par_id,line_id,ark,json->>'id' as word,
 text,
 x_wconf,
 json,
 b[5]::integer-b[3]::integer as height,b[4]::integer-b[2]::integer as length,
 st_setsrid(st_makebox2d(st_makepoint(b[2]::integer,-b[3]::integer),
   st_makepoint(b[4]::integer,-b[5]::integer)),32662) as bbox
from a
where text is not null;

create index words_ark on tesseract.words(ark);
create index words_line_id on tesseract.words(line_id);

GRANT USAGE ON SCHEMA tesseract to PUBLIC;
GRANT SELECT ON ALL TABLES IN SCHEMA tesseract to PUBLIC;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA tesseract to PUBLIC;
