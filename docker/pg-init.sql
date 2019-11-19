CREATE SCHEMA IF NOT EXISTS datafest;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET search_path = datafest,public,pg_catalog;

-- CREATE TABLES
CREATE TABLE page (
  page_id TEXT PRIMARY KEY,
  index INTEGER NOT NULL,
  catalog_id TEXT NOT NULL
);

CREATE TABLE mark (
  mark_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  page_id TEXT REFERENCES page NOT NULL,
  top INTEGER NOT NULL,
  "left" INTEGER NOT NULL,
  bottom INTEGER NOT NULL,
  "right" INTEGER NOT NULL,
  "type" TEXT,
  color TEXT,
  vintage INTEGER,
  price INTEGER
);



-- CREATE ROLES
CREATE ROLE anon;
CREATE ROLE datafestuser;
CREATE ROLE admin;
CREATE ROLE authenticator noinherit;

-- ALLOW PGR TO UPGRADE ROLES 
GRANT datafestuser TO authenticator;
GRANT anon TO authenticator;
GRANT admin TO authenticator;

-- SET ROLE USAGE
GRANT usage ON SCHEMA datafest TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA datafest TO anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA datafest TO anon;

GRANT SELECT ON ALL TABLES IN SCHEMA datafest TO datafestuser;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA datafest TO datafestuser;
GRANT INSERT ON datafest.mark TO datafestuser;

GRANT usage ON SCHEMA datafest TO admin;
grant all on all tables in schema datafest to admin;
grant execute on all functions in schema datafest to admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA datafest TO admin;