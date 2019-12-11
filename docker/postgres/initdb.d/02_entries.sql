DROP SCHEMA IF exists wine_search cascade;
create schema wine_search;

CREATE TABLE wine_search.search_prices (
    page_ark text,
    ark text,
    page integer,
    name text,
    vintage integer,
    type text,
    color text,
    country text,
    section text,
    bottle_type text,
    perprice numeric(12,2),
    caseprice numeric(12,2),
    bbox text,
    title text,
    publisher text,
    publication_date integer
);

copy wine_search.search_prices from 'io/wine_search.csv' with csv header;

create materialized view wine_search.price as
select
row_number() OVER (order by page_ark) as price_id,
page_ark,ark,
name,vintage,type,color,country,section,bottle_type,
perprice,caseprice,
st_setsrid(st_geomfromgeojson(bbox),32662)  as bbox
from wine_search.search_prices;

create index price_bbox on wine_search.price USING GIST(bbox);
create index price_page_ark on wine_search.price(page_ark);

GRANT USAGE ON SCHEMA wine_search to PUBLIC;
GRANT SELECT ON ALL TABLES IN SCHEMA wine_search to PUBLIC;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA wine_search to PUBLIC;
