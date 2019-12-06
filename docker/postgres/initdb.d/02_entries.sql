DROP SCHEMA IF exists wine_search cascade;
create schema wine_search;

CREATE TABLE wine_search.prices (
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

copy wine_search.prices from 'io/wine_search.csv' with csv header;
