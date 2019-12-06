# Initialization

We include initializing of the postgres database in the Dockerfile.  You will
notice on the first instantiation of the image that it will that a pretty long
while to get up and running. The reason for that is that a large number of files
are downloaded for ingest into the database.  Some of these are very large.
It's pretty important that you use a volume for your docker image database, so
this is sticky and fast.

Below is an example of a docker-compose file that includes a docker volume for
the database.  ~/var/lib/postgresql/data~ is where the raw data is downloaded as
well.

``` yml
# This is an example docker-compose for this image
version: '2'

volumes:
  db:

services:
  postgres:
    build: ./postgres
    volumes:
      - db:/var/lib/postgresql/data
    ports:
      - 5432:5432
```

You can tail the docker-compose logs to verify that the postgres database is
still chugging along.  This is only done on the initialization of the database.
Afterwards the docker service can be started and stopped quickly.

# Included Data

## Tesseract

Tesseract data from all the Sherry-Lehmann catalogs are included in the
~tesseract~ schema. Materialized views of all the data are also included to make
the data more easily used in the database.  These views expand the tesseract OCR
in sort of expected ways.

## Countries

We get the country codes from a small project,
[country_codes](https://github.com/qjhart/country_codes),
[commit](https://github.com/qjhart/country_codes/commit/c22d5021d08661fd7e83e7b76c96ec3c8359594c).
If these change you currently have to manually update the
initdb.d/02_countries.sql file.
