CREATE SCHEMA IF NOT EXISTS datafest;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET search_path = datafest,public,pg_catalog;

-- CREATE TABLES
CREATE TABLE catalog (
  catalog_id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE page (
  page_id TEXT PRIMARY KEY,
  catalog_id TEXT  REFERENCES catalog NOT NULL,
  index INTEGER NOT NULL,
  score INTEGER
);

CREATE TABLE mark (
  mark_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_mark_id UUID REFERENCES mark,
  page_id TEXT REFERENCES page NOT NULL,
  user_id TEXT NOT NULL,
  top INTEGER NOT NULL,
  "left" INTEGER NOT NULL,
  bottom INTEGER NOT NULL,
  "right" INTEGER NOT NULL,
  section BOOLEAN,
  wine_type TEXT,
  bottle_type TEXT,
  color TEXT,
  vintage INTEGER,
  bottle_price FLOAT,
  case_price FLOAT
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
GRANT UPDATE ON datafest.mark TO datafestuser;
GRANT DELETE ON datafest.mark TO datafestuser;

GRANT usage ON SCHEMA datafest TO admin;
grant all on all tables in schema datafest to admin;
grant execute on all functions in schema datafest to admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA datafest TO admin;