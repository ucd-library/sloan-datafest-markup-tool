#! /bin/bash

# This script copies some importable data unto our system, in preparation for copying into postgres
# The IO data should be a volume in your postgres system, this is a standard location for that.

io=/var/lib/postgresql/data/io
mkdir ${io}

# Get Rtessearct Data
curl --output ${io}/Rtesseract_words.csv https://gitlab.dams.library.ucdavis.edu/wine-prices/datafest201912/raw/master/R/Rtesseract_words.csv?inline=false

# Get HOCR data
curl --output ${io}/hocr.tsv https://gitlab.dams.library.ucdavis.edu/wine-prices/datafest201912/raw/master/tesseract/hocr.tsv?inline=false

mkdir ${io}/ancil
# Get Ancillary Datasets
for d in countries countries_adj designations producers  provinces regions varieties; do
  curl --output ${io}/ancil/$d.csv https://gitlab.dams.library.ucdavis.edu/wine-prices/datafest201912/raw/master/ancillary_data/$d.csv?inline=false
done

# Get Wine-search information
curl --output ${io}/wine_search.csv https://gitlab.dams.library.ucdavis.edu/wine-prices/sl-wine-prices/raw/master/wine_search.csv?inline=false
