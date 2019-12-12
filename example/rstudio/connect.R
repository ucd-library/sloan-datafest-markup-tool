install.packages(c("tidyverse", "RPostgres"))
require("RPostgres") 
library(dplyr)
library(dbplyr)

con <- DBI::dbConnect(
  RPostgres::Postgres(), 
  dbname = "postgres",
  host = "datafest201912.library.ucdavis.edu", 
  port = 49152,
  user = "anon",
  password = "anon"
)

dbListTables(con)

tables=dbGetQuery(con,
 "SELECT table_schema,table_name FROM information_schema.tables
  where table_schema in('datafest','rtesseract','catalogs','wine_search')
")

tables

mark <- tbl(con, "mark")
data <- mark %>%
  filter(page_id == '/collection/sherry-lehmann/D-637/d76h1h/media/images/d76h1h-018.jpg') %>%
  select(everything()) %>%
  collect()

# or using plain SQL
data <- dbGetQuery(con, "select * from mark where page_id = '/collection/sherry-lehmann/D-637/d76h1h/media/images/d76h1h-018.jpg'")

words <- dbGetQuery(con, "select * from rtesseract.word limit 10")
words <- tbl(con,"rtesseract.rtesseract_word")
