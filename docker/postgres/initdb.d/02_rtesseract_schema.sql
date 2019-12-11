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

copy rtesseract.rtesseract_word from 'io/Rtesseract_words.csv' with csv;
-- There are some bad wods in this setup.
delete from rtesseract.rtesseract_word where "left"=0 and top=0;

create materialized view rtesseract.word as
select
page_ark ||'-'||num as word_id,
page_ark,
st_setsrid(st_makebox2d(st_makepoint("left",-top),st_makepoint("right",-bottom)),32662) as bbox,
text,
confidence
from rtesseract.rtesseract_word;

create index word_bbox on rtesseract.word USING GIST(bbox);
create index word_page_ark on rtesseract.word(page_ark);

create materialized view rtesseract.page as
select page_ark,count(*) as word_count
from  rtesseract.word
group by page_ark;
create index page_page_ark on rtesseract.page(page_ark);

GRANT USAGE ON SCHEMA rtesseract to PUBLIC;
GRANT SELECT ON ALL TABLES IN SCHEMA rtesseract to PUBLIC;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA rtesseract to PUBLIC;
