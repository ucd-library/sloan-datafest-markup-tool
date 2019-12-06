drop schema if exists ancil cascade;
create schema ancil;
create table ancil.countries (
  country_id serial primary key,
  country text
);
create table ancil.countries_adj (
  country_id serial primary key,
  country_adj text
);
create table ancil.designations (
  designation_id serial primary key,
  designation text
);
create table ancil.producers (
  producer_id serial primary key,
  producer text,
  country text
);
create table ancil.provinces (
  province_id serial primary key,
  province text,
  country text
);
create table ancil.regions (
  region_id serial primary key,
  region text,
  country text
);
create table ancil.varieties (
  variety_id serial primary key,
  variety text
);

copy ancil.countries from 'io/ancil/countries.csv' with csv header;
copy ancil.countries_adj from 'io/ancil/countries_adj.csv' with csv header;
copy ancil.designations from 'io/ancil/designations.csv' with csv header;
copy ancil.producers from 'io/ancil/producers.csv' with csv header;
copy ancil.provinces from 'io/ancil/provinces.csv' with csv header;
copy ancil.regions from 'io/ancil/regions.csv' with csv header;
copy ancil.varieties from 'io/ancil/varieties.csv' with csv header;

update ancil.countries set country=trim(both from country);
update ancil.countries_adj set  country_adj=trim(both from country_adj);
update ancil.designations set  designation=trim(both from designation);
update ancil.producers set  producer=trim(both from producer), country=trim(both from country) ;
update ancil.provinces set  province=trim(both from province), country=trim(both from country) ;
update ancil.regions set region=trim(both from region), country=trim(both from country) ;
update ancil.varieties set  variety=trim(both from variety);
