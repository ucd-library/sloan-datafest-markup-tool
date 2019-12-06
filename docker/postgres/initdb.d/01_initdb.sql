CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
COMMENT ON EXTENSION postgis IS 'Postgis Geographic Package';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

CREATE ROLE anon;
CREATE ROLE datafestuser;
CREATE ROLE admin;
CREATE ROLE authenticator noinherit;

-- ALLOW PGR TO UPGRADE ROLES
GRANT datafestuser TO authenticator;
GRANT anon TO authenticator;
GRANT admin TO authenticator;

alter database :DBNAME set search_path to datafest,catalogs,public,pg_catalog;
