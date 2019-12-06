DROP SCHEMA if exists catalogs cascade;
CREATE SCHEMA catalogs;

-- CREATE TABLE languages (
--     id bigint NOT NULL,
--     language text,
--     created_at timestamp without time zone,
--     updated_at timestamp without time zone
-- );

CREATE TABLE catalogs.wine_type (
 wine_type text primary key
);
insert into wine_type
values ('Still'),('Sparkling'),('Fortified');

CREATE TABLE catalogs.wine_color (
 color text primary key
);
insert into catalogs.wine_color
values ('Red'),('White'),('Rosé');

CREATE TABLE catalogs.bottle_info (
    bottle_type text primary key,
    volume double precision,
    ratio double precision,
    notes text,
    champagne boolean,
    bordeaux boolean,
    burgandy boolean
);

insert into catalogs.bottle_info (bottle_type,volume,ratio,notes,champagne,bordeaux,burgandy)
select * from
(VALUES
('Piccolo',0.1875,0.25,'"Small" in Italian. Also known as a quarter bottle, pony, snipe or split.',true,false,false),
('Split',0.1875,0.25,null,true,false,false),
('Quarter',0.2,0.2667,'Used for Champagne',true,false,false),
('Chopine',0.25,0.33,'Traditional French unit of volume',false,true,false),
('Demi',0.375,0.5,'"Half" in French. Also known as a half bottle.',true,true,true),
('Half Bottle',0.375,0.5,'"One half standard bottle.',false,false,false),
('Tenth',0.378,0.505,'One tenth of a US gallon*',false,false,false),
('Jennie',0.5,0.67,'Also known as a 50 cl bottle. Used for Tokaj, Sauternes, Jerez, as well as several other types of sweet wines, also common for cheaper wines in Switzerland.',true,false,false),
('Demie',0.5,0.67,'',true,false,false),
('Pinte',0.5,0.67,'',true,false,false),
('Clavelin',0.62,0.83,'Primarily used for vin jaune.',false,false,false),
('Standard',0.75,1,'',true,true,true),
('Fifth',0.757,1.01,'One-fifth of a US gallon* (before 1979)',false,false,false),
('Litre',1,1.33,'Popular size for Austrian wines.',false,false,false),
('Magnum',1.5,2,'',true,true,true),
('Marie Jeanne',2.25,3,'Also known as a Tregnum or Tappit Hen in the port wine trade.',false,true,false),
('Jeroboam',3,4,'Biblical, First king of Northern Kingdom. ''Jeroboam'' has different meanings (that is, indicates different sizes) for different regions in France.',true,true,true),
('Rehoboam',4.5,6,'Biblical, First king of separate Judea',true,false,true),
('McKenzie',5,6.67,'Uncommon, primarily found in France',false,true,false),
('Imperial',6,8,'',false,true,false),
('Methuselah',6,8,'Biblical, Oldest Man',true,false,true),
('Salmanazar',9,12,'Biblical, Assyrian King',true,true,true),
('Balthazar',12,16,'One of three Wise Men (according to legend) to present gifts at Jesus'' nativity; Belshazzar can also denote the co-regent of Babylon during the madness of Nebuchadnezzar, for whom the next-larger bottle size is named.',true,true,true),
('Nebuchadnezzar',15,20,'Biblical, King of Babylon',true,true,true),
('Melchior',18,24,'One of three Wise Men (according to legend) to present gifts at Jesus'' nativity',true,true,true),
('Solomon',18,24,'Biblical, King of Israel, Son of David',true,false,false),
('Sovereign',26.25,35,'Reportedly created by Taittinger in 1988 for the launch of the then world''s largest cruise liner Sovereign of the Seas[10]',true,false,false),
('Primat',27,36,'Biblical, stoned by David',true,true,false),
('Goliath',27,36,null,true,true,false),
('Melchizedek',30,40,'Biblical, King of Salem',true,false,false),
('Midas',30,40,'Biblical, King of Salem',true,false,false)
) as b(bottle_type,volume,ratio,notes,champagne,bordeaux,burgandy);

CREATE TABLE catalogs.catalogs (
    ark text,
    file text,
    year integer,
    name text
);

COPY catalogs.catalogs from STDIN with CSV header;
ark,file,year,name
d70597,D-005/d70597.ttl,1972,Summer and Early Fall Values 1972
d70p4h,D-005/d70p4h.ttl,1966,Plain Facts Liquor and Wine Prices.New York State Nov 1966
d7101s,D-005/d7101s.ttl,1975,Season's Greetings 1975
d7160g,D-005/d7160g.ttl,1957,Vintage Chart Including 1957
d71p4t,D-005/d71p4t.ttl,1969,Letter. Domaine De La Romanee Conti June 1969
d72013,D-005/d72013.ttl,1968,depuis 1822 Nicolas
d72g6t,D-005/d72g6t.ttl,1961,Greatest Pre-Summer Sale 1961
d72p44,D-005/d72p44.ttl,1973,Season's Greetings 1973
d72s3s,D-005/d72s3s.ttl,1973,Vintage of Values 1973
d7301d,D-005/d7301d.ttl,1976,Newspaper Ad 1976
d73s33,D-005/d73s33.ttl,1967,Your Own New Year's Party 1967
d73w2r,D-005/d73w2r.ttl,1974,Annual Sale 1974
d74g6f,D-005/d74g6f.ttl,1950,Private Sale 1949-1950
d74s3d,D-005/d74s3d.ttl,1978,Great Summer Savings June 1978
d75c73,D-005/d75c73.ttl,1970,Summer Money Saving Sale 1970
d76k5q,D-005/d76k5q.ttl,1973,Summer Sale 1973
d76p4c,D-005/d76p4c.ttl,1978,Season's Greetings 1978
d77g6c,D-005/d77g6c.ttl,1967,Wine List 1967
d77p4p,D-005/d77p4p.ttl,1968,WIne List 1968
d7859q,D-005/d7859q.ttl,1947,Bellows and Company WIne Catalogue 1947
d78g6p,D-005/d78g6p.ttl,1975,Great Pre-Holiday Sale 1975
d79591,D-005/d79591.ttl,1967,Season's Greetings 1967 (landscape)
d79g60,D-005/d79g60.ttl,1968,Christmas Dinner by James Beard 1968
d79w2m,D-005/d79w2m.ttl,1968,Yuletide Vintage of Values 1968 -1969
d7b01k,D-005/d7b01k.ttl,1960,Wine and Spirits List 1960
d7b880,D-005/d7b880.ttl,1980,Great Money Saving Values 1980
d7bc7n,D-005/d7bc7n.ttl,1971,Money Saving Sale 1971
d7c889,D-005/d7c889.ttl,1968,Vintage of Values 1968
d7cc7z,D-005/d7cc7z.ttl,,House Beautiful Madeira
d7d59z,D-005/d7d59z.ttl,1977,Great Money Saving Sale 1977
d7d88m,D-005/d7d88m.ttl,1962,Report. Present Wine Situation 1962
d7dw2j,D-005/d7dw2j.ttl,1976,Spring Summer Sale 1976
d7f598,D-005/d7f598.ttl,1974,"Sale, Our Annual Money Saving Sale 1974"
d7fk5w,D-005/d7fk5w.ttl,1953,Complete Wine and Spirits Listing 1953-1954 and Gift Catalog
d7fs36,D-005/d7fs36.ttl,1949,Summer Wines 1949
d7g01t,D-005/d7g01t.ttl,1975,Season's Greetings 1975
d7g59k,D-005/d7g59k.ttl,1969,Report on the Wine Market 1969
d7gp4v,D-005/d7gp4v.ttl,1959,Fall Sale 1959
d7h014,D-005/d7h014.ttl,1979,Values from our Wine Press 1979
d7hp45,D-005/d7hp45.ttl,1950,Fall Winter Catalogue 1949-1950
d7j01f,D-005/d7j01f.ttl,1965,Great Mid Winter Sale 1965
d7jp4g,D-005/d7jp4g.ttl,1970,Vintage of Values 1970
d7k01r,D-005/d7k01r.ttl,1976,Annual Sale 1976
d7k885,D-005/d7k885.ttl,1952,Christmas 1952
d7kg6g,D-005/d7kg6g.ttl,1947,Spring Values 1947
d7ks3f,D-005/d7ks3f.ttl,1969,Great Money Saving Sale 1969
d7kw23,D-005/d7kw23.ttl,1969,Annual Summer Sale 1969
d7m012,D-005/d7m012.ttl,1959,Season's Greetings from Sherry Wine & Spirits Co 1959
d7ms3r,D-005/d7ms3r.ttl,1971,"Summer Sale Featuring Art, Wine, and Spirits 1971"
d7mw2d,D-005/d7mw2d.ttl,1964,Advance Offering 1964
d7nc7f,D-005/d7nc7f.ttl,1973,Summer-Fall Sale 1973
d7np4d,D-005/d7np4d.ttl,1971,The Basic 6 Case Cellar NY Times 1971 Craig Claiborne
d7pc7r,D-005/d7pc7r.ttl,1970,Report. Wines of Europe 1970
d7pp4q,D-005/d7pp4q.ttl,1977,Season's Greetings 1977
d7ps3c,D-005/d7ps3c.ttl,1959,Annual Summer Sale 1959
d7q30n,D-005/d7q30n.ttl,1951,18th Annual Sale 1951
d7qg6q,D-005/d7qg6q.ttl,1976,Special Sale Offering 1976
d7qp41,D-005/d7qp41.ttl,1969,Annual Mid Winter Sale 1969
d7r592,D-005/d7r592.ttl,1964,Spring Values 1964
d7rg61,D-005/d7rg61.ttl,1979,Summer Catalog 1979
d7s59c,D-005/d7s59c.ttl,1967,The Wines of Nicolas are here 1967
d7s881,D-005/d7s881.ttl,1978,Christmas Dinner James Beard 1978
d7sg6b,D-005/d7sg6b.ttl,1974,Our Annual Money-saving Sale 1974
d7t01x,D-005/d7t01x.ttl,1957,Vintage Chart 1957
d7t59p,D-005/d7t59p.ttl,1969,Report. The Great 1969 Red Burgundies
d7tg6n,D-005/d7tg6n.ttl,1965,Season's Greetings (Globe Theater) 1965
d7ts3m,D-005/d7ts3m.ttl,1951,Fall Winter Catalogue 1950-1951
d7v88n,D-005/d7v88n.ttl,1958,Spring and Summer Sale 1958
d7vc79,D-005/d7vc79.ttl,1972,Season's Greetings 1972
d7w01j,D-005/d7w01j.ttl,1968,Great Money-Saving Sale 1968
d7w88z,D-005/d7w88z.ttl,1966,Money Saving Spring Values 1966
d7w89b,D-005/d7w89b.ttl,1960,Great Mid Winter Sale 1960
d7ww2w,D-005/d7ww2w.ttl,1970,Report. Sale Items Most in Demand Mar 1970
d7xw26,D-005/d7xw26.ttl,1971,Season's Greetings 1971-1972
d7z30t,D-005/d7z30t.ttl,1958,Season's Greetings 1958
d7z59x,D-005/d7z59x.ttl,1977,Newspaper Ad 1977
d7zk5j,D-005/d7zk5j.ttl,1951,Gift Ideas 1950-1951
d7zp46,D-005/d7zp46.ttl,1958,Autumn Leaves from our Cellar Book
d7001g,D-202/d7001g.ttl,1954,Sale 1954
d7088w,D-202/d7088w.ttl,1953,Spring Sale 1953
d70c7j,D-202/d70c7j.ttl,1958,Summer Sale 1958
d70k5v,D-202/d70k5v.ttl,1948,Price Catgalog 1948
d70w2t,D-202/d70w2t.ttl,1968,Vintage of Values March 1968
d71c7v,D-202/d71c7v.ttl,1957,Share Some of our Discoveries 1957
d71g6h,D-202/d71g6h.ttl,1950,Values 1950
d71s3g,D-202/d71s3g.ttl,1965,Money Saving Values April 1965
d7230r,D-202/d7230r.ttl,1957,Letter 1957
d7259v,D-202/d7259v.ttl,1960,Autumn Selections 1960
d72c75,D-202/d72c75.ttl,1956,Annual Spring Sale 1956
d7302s,D-202/d7302s.ttl,1961,The Flavor of France November 1961
d73595,D-202/d73595.ttl,1958,Historic Madeira 1958
d7388t,D-202/d7388t.ttl,1938,Catalogue of Wines and Spirits 1938
d73g64,D-202/d73g64.ttl,1955,Windfalls from our Cellar Book 1955
d73k5s,D-202/d73k5s.ttl,1981,Greatest WIne Sale August 1981
d7401q,D-202/d7401q.ttl,1952,Fall Sale 1952
d7459g,D-202/d7459g.ttl,1958,Spring Summer Sale 1958
d74884,D-202/d74884.ttl,1941,Wine From This Native Soil 1941
d74k53,D-202/d74k53.ttl,1967,Wine List December 1967
d74s4s,D-202/d74s4s.ttl,1969,Christmas Catalog 1969
d75011,D-202/d75011.ttl,1964,Season's Greetings Dec 1964
d7530p,D-202/d7530p.ttl,1956,Fall Values 1956
d7588f,D-202/d7588f.ttl,1955,Season's Greetings 1955
d75k5d,D-202/d75k5d.ttl,1957,Annual Money Saving Sale 1957
d75p42,D-202/d75p42.ttl,1967,Christmas Dinner 1967 in honor of James Beard
d75s3q,D-202/d75s3q.ttl,1948,Letter Hotel George Paris 1948
d7601b,D-202/d7601b.ttl,1963,PreSummer Sale May 1963
d76300,D-202/d76300.ttl,1955,Annual Spring Sale 1955
d7688r,D-202/d7688r.ttl,1954,Fall Values 1954
d76c7d,D-202/d76c7d.ttl,1969,News April 1969
d76s31,D-202/d76s31.ttl,1949,For a Merrier Christmas 1949
d76w2p,D-202/d76w2p.ttl,1958,Mid Winter Sale 1958
d77309,D-202/d77309.ttl,1950,James Beard Reports 1950
d7759d,D-202/d7759d.ttl,1957,Windfalls from our Cellar Book Oct 1957
d77c7q,D-202/d77c7q.ttl,1969,Annual Summer Sale June 1969
d77s3b,D-202/d77s3b.ttl,1949,Sensational Offering 1949
d77w20,D-202/d77w20.ttl,1960,Sale 1960
d7830m,D-202/d7830m.ttl,1957,Notable Offerings from our Summer Sale 1957
d78c71,D-202/d78c71.ttl,1969,Great Money Saving Sale February 1969
d78k5b,D-202/d78k5b.ttl,1957,"Spring Summer Sale, June 1957"
d78p40,D-202/d78p40.ttl,1963,Season's Greetings Dec 1963
d78w29,D-202/d78w29.ttl,1957,Sale 1957
d79018,D-202/d79018.ttl,1950,To A Gay and Festive Summer 1950
d7988p,D-202/d7988p.ttl,1956,Autumn Leaves from our Cellar Book 1956
d79k5n,D-202/d79k5n.ttl,1952,Letter 1952
d79p49,D-202/d79p49.ttl,1962,Notable Discoveries from our Cellar Book October 1962
d7b59b,D-202/d7b59b.ttl,1967,Newsletter. Price list 1967
d7bg69,D-202/d7bg69.ttl,1959,"Spring Summer Sale, May 1959"
d7bp4m,D-202/d7bp4m.ttl,1960,Mid Winter Sale 1960
d7bs38,D-202/d7bs38.ttl,1949,Buy in the Summer and Save 1949
d7c01w,D-202/d7c01w.ttl,1959,"Spring Summer Sale, July 1959"
d7c30j,D-202/d7c30j.ttl,1968,Wall Street Journal December 1968
d7cg6m,D-202/d7cg6m.ttl,1950,Values Newsletter 1950
d7cp4x,D-202/d7cp4x.ttl,1956,Wines of Germany 1956
d7cs3k,D-202/d7cs3k.ttl,1953,Historic Announce 1953
d7d016,D-202/d7d016.ttl,1947,Letter Bellows & Company 1947
d7d30v,D-202/d7d30v.ttl,1968,Yuletide Vintage of Values 1968
d7dg6x,D-202/d7dg6x.ttl,1964,Pre Holiday Sale November 1964
d7dk5k,D-202/d7dk5k.ttl,1957,Fall Sale 1957
d7ds3w,D-202/d7ds3w.ttl,1952,Season's Greetings 1952
d7f305,D-202/d7f305.ttl,1957,Advance Report 1957
d7f88x,D-202/d7f88x.ttl,1949,Charette of VIns du Pays 1949
d7fg67,D-202/d7fg67.ttl,1962,Summer Sale August 1962
d7fw2v,D-202/d7fw2v.ttl,1967,Season's Greetings 1967
d7g30g,D-202/d7g30g.ttl,1958,Season's Greetings 1958
d7g887,D-202/d7g887.ttl,1957,"Spring Summer Sale, Spr 1957"
d7gc7w,D-202/d7gc7w.ttl,1958,Autumn Leaves from our Cellar Book 1958
d7gk56,D-202/d7gk56.ttl,1954,Spring Summer Sale 1954
d7gw25,D-202/d7gw25.ttl,1966,Pre Holiday Sale 1966
d7h59w,D-202/d7h59w.ttl,1964,Vintages of Values (Feb 1964)
d7h88j,D-202/d7h88j.ttl,1952,Mid-Summer Sale 1952
d7hc76,D-202/d7hc76.ttl,1958,Notable Discoveries from our Cellar Books 1958
d7hg6v,D-202/d7hg6v.ttl,1952,Annual Winter Sale 1952
d7hs3t,D-202/d7hs3t.ttl,1968,depuis 1922 Nicholas 1968
d7j303,D-202/d7j303.ttl,1958,Fortnum & Mason 1958
d7j596,D-202/d7j596.ttl,1964,Great Summer Sale 1964
d7jc7h,D-202/d7jc7h.ttl,1958,Fall Sale 1958
d7jg65,D-202/d7jg65.ttl,1954,Notes from our Cellar Book 1954
d7js34,D-202/d7js34.ttl,1965,Summer Sale 1965
d7k30d,D-202/d7k30d.ttl,1961,Exciting Wine News from Burgundy 1961
d7k59h,D-202/d7k59h.ttl,1962,Summer Sale May 1962
d7kk54,D-202/d7kk54.ttl,1980,Autumn Values from our WIne Press 1980
d7kw3g,D-202/d7kw3g.ttl,1959,Season's Greetings 1959
d7m59t,D-202/d7m59t.ttl,1948,For a Merrier Christmas 1948
d7m88g,D-202/d7m88g.ttl,1949,To a Gay and Festive Summer 1949
d7mg6s,D-202/d7mg6s.ttl,1959,Season's Greetings 1959
d7mk5f,D-202/d7mk5f.ttl,1965,Advance Offering of 1964 Wines June 1965
d7n01c,D-202/d7n01c.ttl,1950,Fall Values 1950
d7n301,D-202/d7n301.ttl,1956,Mid-Summer Opportunity 1956
d7n88s,D-202/d7n88s.ttl,1953,November Windfalls Sale 1953
d7nk5r,D-202/d7nk5r.ttl,1968,Summer Sale 1968
d7ns32,D-202/d7ns32.ttl,1956,Season's Greetings 1956
d7p01p,D-202/d7p01p.ttl,1963,Fall Sale 1963
d7p30b,D-202/d7p30b.ttl,1955,WIndfalls from our Cellar Book 1955
d7p883,D-202/d7p883.ttl,1949,Best Pre-Holiday Buys 1949
d7pk52,D-202/d7pk52.ttl,1949,"NEWS! 16,782 Bottles 1949"
d7pw21,D-202/d7pw21.ttl,1962,Great Money Saving Sale March 1962
d7q59r,D-202/d7q59r.ttl,1957,Season's Greetings 1957 insert James Beard
d7qc72,D-202/d7qc72.ttl,1970,WIne List 1970
d7qs3p,D-202/d7qs3p.ttl,1953,Season's Greetings 1953
d7qw2b,D-202/d7qw2b.ttl,1950,For Merrier Holiday Season 1950
d7r30z,D-202/d7r30z.ttl,1948,To a Gay and Festive Summer 1948
d7rc7c,D-202/d7rc7c.ttl,1967,Great Mid Winter Sale March 1967
d7rp5q,D-202/d7rp5q.ttl,1953,Wine Event Frank Schoonmaker 1953
d7rw2n,D-202/d7rw2n.ttl,1959,Autumn Leaves from our Cellar Book 1959
d7s01m,D-202/d7s01m.ttl,1951,Rhine and Moselle 1951
d7sk50,D-202/d7sk50.ttl,1956,Memo 1956
d7sp4n,D-202/d7sp4n.ttl,1948,Devaluation is Here ! 1948
d7sw2z,D-202/d7sw2z.ttl,1960,Share Some of our Discoveries 1960
d7t88b,D-202/d7t88b.ttl,1952,Spring Summer Sale 1952
d7tg71,D-202/d7tg71.ttl,1963,Sale February 1963
d7tp4z,D-202/d7tp4z.ttl,1961,Annual Money Saving Sale 1961
d7v017,D-202/d7v017.ttl,1960,Fall Sale 1960 insert James Beard interview Frank Schoonmaker
d7v30w,D-202/d7v30w.ttl,1988,Summer Wine Sale 1988
d7vg6z,D-202/d7vg6z.ttl,1952,Unique Sale from Bellows and Co 1952
d7vp48,D-202/d7vp48.ttl,1960,Fall Sale 1960
d7vs3x,D-202/d7vs3x.ttl,1948,Visit our new home catalog 1948
d7w306,D-202/d7w306.ttl,1967,Great Mid Winter Sale 1967
d7wg68,D-202/d7wg68.ttl,1950,19 Countries Devaluate 1950
d7wk5x,D-202/d7wk5x.ttl,1957,Season's Greetings 1957
d7ws37,D-202/d7ws37.ttl,1950,Sale Moselle and Rhine 1950
d7x30h,D-202/d7x30h.ttl,1966,Money Saving Spring Values April 1966
d7x59m,D-202/d7x59m.ttl,1965,House and Garden November 1965 Merger Announcement
d7x888,D-202/d7x888.ttl,1957,Fortnum & Mason 1957
d7xg6k,D-202/d7xg6k.ttl,1948,Rare Opportunity 1948
d7xk57,D-202/d7xk57.ttl,1960,Summer Sale 1960
d7xs3j,D-202/d7xs3j.ttl,1949,Spring Values 1949
d7z88k,D-202/d7z88k.ttl,1964,Start Saving Now September 1964
d7zc77,D-202/d7zc77.ttl,1958,Pre-Holiday Report 1958
d7zw2h,D-202/d7zw2h.ttl,1969,Epoch Making WIne News Summer 1969
d7007r,D-637/d7007r.ttl,2002,Catalog 2002: Sherry-Lehmann.com Featuring Raymond Costantini's Photo Art Saluting Neighborhood Restaurants
d70652,D-637/d70652.ttl,2016,Winter 2016: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7094q,D-637/d7094q.ttl,1979,"The Schloss Eltz ""Treasure Cellar"" Wine Tasting"
d70d3c,D-637/d70d3c.ttl,1976,Great Money-Saving Sale
d70m1p,D-637/d70m1p.ttl,1973,"Wine List Xmas 1973 (""Sherry Lehmann Reports"")"
d70q0b,D-637/d70q0b.ttl,1973,November/December 1973: Who Says Good French Wines Have To Be Expensive? (two copies)
d70s9f,D-637/d70s9f.ttl,1997,Spring 1997: Sherry-Lehmann Spring Wine Sale
d71072,D-637/d71072.ttl,2004,Catalog 2004: www.Sherry-Lehmann.com Fun & Easy Shooping Online (two copies in folder)
d7165c,D-637/d7165c.ttl,1993,Sherry-Lehmann's Spring Wine Sale Featuring Paintings of Paris Bistros By Wayne Ensrud
d71d3p,D-637/d71d3p.ttl,1973,"August 1973: ""This Labor Day Weekend Report is being mailed in limited quantity..."""
d71h1z,D-637/d71h1z.ttl,1976,New Year's Eve Telegram: Offer Exceptional Values For New Year's Eve Parties
d71q0n,D-637/d71q0n.ttl,1990,"Autumn 1990: Sherry-Lehmann Vintage Values Featuring ""Vintage: The Story of Wine"" By Hugh Johnson"
d71s9r,D-637/d71s9r.ttl,1999,Autumn 1999: Sherry-Lehmann Autumn Wine Sale
d7207c,D-637/d7207c.ttl,2007,Spring 2007: Sherry-Lehmann.com 73rd Annual Spring Wine & Spirits Sale
d7265p,D-637/d7265p.ttl,1988,Xmas 1988: Season's Greetings Sherry-Lehmann
d72d30,D-637/d72d30.ttl,1979,Correspondence with Mailmen Inc. Regarding Wine Shipment
d72h2n,D-637/d72h2n.ttl,1989,December 1989: Domaine De La Romainee-Conti Mailing
d72m19,D-637/d72m19.ttl,1992,Holiday 1992: Season's Greetings from Sherry Lehmann Featuring The Murals of Cafe des Artistes In Celebration of Their 75th Anniversary
d72s92,D-637/d72s92.ttl,2001,Fall 2001: Sherry-Lehmann Autumn Wine Sale
d72w8q,D-637/d72w8q.ttl,2011,Autumn 2011: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d73650,D-637/d73650.ttl,1978,Xmas 1978: Season's Greetings
d7394n,D-637/d7394n.ttl,1976,June 1976: Our Annual Money-Saving Sale of Fine Wines and Spirits
d73h2z,D-637/d73h2z.ttl,1978,"May 1978: Old, Rare Bordeaux Letter (two copies of letter)"
d73m1m,D-637/d73m1m.ttl,1995,Summer 1995: Sherry-Lehmann's Summer Wine Sale
d73s9c,D-637/d73s9c.ttl,2003,Holiday 2003: Season's Greetings from Sherry-Lehmann.com Wine & Spirits Merchants
d73w81,D-637/d73w81.ttl,2016,Autumn 2016: Sherry-Lehmann Wine & Spirits Merchancts Since 1934
d74070,D-637/d74070.ttl,1981,April 1981 Insert: Spring Wine Sale in the New York Times
d74659,D-637/d74659.ttl,1976,March 1976: A Special Sale Offering of Exceptional Wines and Spirits Priced Below the Current Market (two copies)
d7494z,D-637/d7494z.ttl,1973,May 1973: Advance Offering of the Great 1969 Red Burgundies and 1970 White Burgundies
d74d3m,D-637/d74d3m.ttl,1975,Catalog 1975: Our Greatest Spring-Summer Sale! From Sherry-Lehmann
d74m29,D-637/d74m29.ttl,1997,Catalog 1997: Sherry-Lehmann's Mid-Winter Red & White Burgundy Sale
d74p9n,D-637/d74p9n.ttl,2004,Catalog 2004: Sherry-Lehmann.com Summer Wine & Spirits Sale Featuring the Museum of Wine in Art at Chateau Mouton Rothschild
d75079,D-637/d75079.ttl,1990,Summer 1990: Summer Wine Sale
d7536z,D-637/d7536z.ttl,1973,Summer Sale!
d75948,D-637/d75948.ttl,1976,September 1976: Private Sale of Burgundies (Alexis Linchine Selections)
d75d3x,D-637/d75d3x.ttl,1990,Summer 1990: Sherry-Lehmann Summer Wine Sale (two copies in folder)
d75m17,D-637/d75m17.ttl,1999,Summer 1999: Sherry-Lehmann Summer Wine Sale Featuring Paintings of Napa Valley Restaurants by Wayne Ensrud
d75q0w,D-637/d75q0w.ttl,2008,Holiday 2008: Sherry-Lehmann Wine and Spirits Merchants Celebrating Our 75th Anniversary
d75w8n,D-637/d75w8n.ttl,1988,Fall 1988: Sherry-Lehmann Autumn Wine Sale
d76368,D-637/d76368.ttl,1979,March 1979: Values From Our Wine Press
d7665x,D-637/d7665x.ttl,1989,August 1989: Pine Ridge Mailing
d76d4m,D-637/d76d4m.ttl,1992,Autumn 1992: Sherry-Lehmann's Autumn Wine Sale
d76h1h,D-637/d76h1h.ttl,2001,Summer 2001: Sherry-Lehmann Summer Wine Sale Featuring Paintings of the Rhone Valley by Wayne Ensrud
d76q1k,D-637/d76q1k.ttl,2011,Summer 2011: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d76w8z,D-637/d76w8z.ttl,1978,"German Wine List Offer (""Why buy wines now -- and before November 27th?"")"
d7736k,D-637/d7736k.ttl,1975,October 1975: Great Pre-Holiday Sale
d77657,D-637/d77657.ttl,1977,The Best of French Champagne And A Superb Scotch On Sale For New Year's Eve(two copies)
d77d3j,D-637/d77d3j.ttl,1995,Catalog 1995: Now's The Time To Purchase The Disappearing 1990 Red Burgundies From Louis Jadot & Other Great Producers
d77h26,D-637/d77h26.ttl,2003,Autumn 2003: Sherry-Lehmann.com Autumn Wine & Spirits Sale
d77q0h,D-637/d77q0h.ttl,2016,Catalog 2016: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d77q1w,D-637/d77q1w.ttl,1977,April 1977: The Most Dramatic Sale of Great Red Bordeaux In Over A Decade! (Special to Long Island Residents)
d77w88,D-637/d77w88.ttl,1975,Xmas 1975: Season's Greetings from Sherry-Lehmann
d78077,D-637/d78077.ttl,1973,April 1973: Why Buy Wines In April--And Before May 1st?
d7866x,D-637/d7866x.ttl,1987,Summer 1987: Sherry-Lehmann Summer Wine Sale
d7893t,D-637/d7893t.ttl,1998,Holiday 1998: Season's Greetings from Sherry-Lehmann
d78h2h,D-637/d78h2h.ttl,2005,Holiday 2005: Season's Greetings from Sherry-Lehmann.com
d78q0t,D-637/d78q0t.ttl,1990,May 1990: 1989 Bordeaux Futures
d78w8k,D-637/d78w8k.ttl,1973,Late Spring: Wine Prices Escalating
d7907j,D-637/d7907j.ttl,1973,"Letter ""To Members of the French Chamber of Commerce in the United States of America"""
d7965v,D-637/d7965v.ttl,1990,Catalog 1990: Sherry-Lehmann's First Wine Sale of the Decade
d7994h,D-637/d7994h.ttl,1999,Spring 1999: Sherry-Lehmann Spring Wine Sale
d79h2t,D-637/d79h2t.ttl,2008,Catalog 2008: Sherry-Lehmann 77th Annual Winter Sale (two copies in folder)
d79q1h,D-637/d79q1h.ttl,1988,Spring 1988: Sherry-Lehmann Spring Wine Sale
d7b087,D-637/d7b087.ttl,1989,1988 Red Bordeaux Advance Offering
d7b354,D-637/d7b354.ttl,1992,Summer 1992: Sherry-Lehmann's Summer Wine Sale Featuring the Paintings of Wayne Ensrud
d7b94t,D-637/d7b94t.ttl,2001,Spring 2001: Sherry-Lehmann Spring Wine Sale
d7bd3g,D-637/d7bd3g.ttl,2012,Winter 2012: Sherry-Lehmann Wine & Spirits Merchants Since 1934 (Celebrating 80 Years)
d7bq0f,D-637/d7bq0f.ttl,1978,Autumn 1978: Autumn Leaves From Our Cellar Book
d7bs9j,D-637/d7bs9j.ttl,1975,August 1975: Our Annual Money-Saving Sale of Fine Wines and Spirits
d7c075,D-637/d7c075.ttl,1977,Mailing: The Great 1961 Red Bordeaux (two copies--one previously stapled to folder)
d7c36t,D-637/d7c36t.ttl,1996,Autumn 1996: Sherry-Lehmann Autumn Wine Sale
d7c944,D-637/d7c944.ttl,2003,Spring 2003: Sherry-Lehmann.com Spring Wine Sale
d7cd3s,D-637/d7cd3s.ttl,2017,Holiday 2017: Sherry-Lehmann Wine & Spirits Merchants Since 1934 (two copies in folder)
d7ch3t,D-637/d7ch3t.ttl,1976,The New York Times: A Dramatic Wine Sale Mailing
d7cm0q,D-637/d7cm0q.ttl,1975,October 1975: Great Pre-Holiday Sale
d7cs9v,D-637/d7cs9v.ttl,1973,Spring 1973: Wine Prices Will Go Up Dramatically Before Summer!
d7cw74,D-637/d7cw74.ttl,1987,Spring 1987: Sherry-Lehmann Spring Wine Sale
d7d364,D-637/d7d364.ttl,1998,Autumn 1998: Sherry-Lehmann Autumn Wine Sale
d7d65s,D-637/d7d65s.ttl,2005,Summer 2005: Sherry-Lerhmann.com Summer Wine & Spirits Sale
d7dh2r,D-637/d7dh2r.ttl,1990,Spring 1990: Sherry-Lehmann Wine & Spirit Merchants Present A Celebration of the Great Restaurants of France
d7dm1d,D-637/d7dm1d.ttl,1972,"Sherry-Lehmann, Inc. Wine & Spirit Merchants Featuring Summer and Early Fall Values in Fine Wine Spirits"
d7dw8t,D-637/d7dw8t.ttl,1991,Holiday 1991: Season's Greetings from Sherry-Lehman
d7f352,D-637/d7f352.ttl,2000,Autumn 2000: Sherry-Lehmann Autumn Wine Sale
d7f653,D-637/d7f653.ttl,2009,Autumn 2009: Saluting Sherry-Lehmann's 75th Anniversary
d7fd21,D-637/d7fd21.ttl,1980,Holiday Dinner by James Beard
d7fm1q,D-637/d7fm1q.ttl,1977,Vintage of Values
d7fp9f,D-637/d7fp9f.ttl,1989,Advance Offering of the 1986 Domaine De La Romanee-Conti
d7fw84,D-637/d7fw84.ttl,1992,Catalog 1992: Sherry-Lehmann's Giant Bordeaux Sale
d7g073,D-637/d7g073.ttl,2002,Holiday 2002: Season's Greetings from Sherry-Lehmann Featuring Drawings of The Great Chateaux of Bordeaux By Mark Dekeister
d7g65d,D-637/d7g65d.ttl,2014,Holiday 2014: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7gd3q,D-637/d7gd3q.ttl,1978,Summer 1978: Great Summer Savings (two copies--see add. notes)
d7gm11,D-637/d7gm11.ttl,1974,Xmas 1974: Season's Greetings from Sherry-Lehmann Inc
d7gq0p,D-637/d7gq0p.ttl,1977,November 1977: A Special Offering of Chateau Gloria
d7gw72,D-637/d7gw72.ttl,1996,"Summer 1996: Sherry-Lehmann Summer Wine Sale ""Blue Ribbon"" Delivery Service To Your Home"
d7h07d,D-637/d7h07d.ttl,2004,Autumn 2004: Sherry-Lehmann.com Autumn Wine & Spirits Sale Featuring An American Artist's Romance with Paris by Wayne Ensrud
d7h64b,D-637/d7h64b.ttl,1978,"December 1978: Mailing (Two mailings: ""To a Gay and Festive Holiday""/""What is the Greatest Contribution to Wine Since the Invention of the Corkscrew?"""
d7h65q,D-637/d7h65q.ttl,1976,April 1976: A Dramatic Wine Sale
d7hd31,D-637/d7hd31.ttl,1975,August 1975: Our Annual Money-Saving Sale of Fine Wines and Spirits
d7hh2p,D-637/d7hh2p.ttl,1973,Spring 1973: Wine Prices Will Go Up Dramatically Before Summer!
d7hq00,D-637/d7hq00.ttl,1988,Summer 1988: Sherry-Lehmann Summer Wine Sale Let Our Values Follow You
d7hs93,D-637/d7hs93.ttl,1998,Summer 1998: Sherry-Lehmann Summer Wine Sale
d7j07q,D-637/d7j07q.ttl,2005,Catalog 2005: Sherry-Lehmann.com Seventy-Second Annual Wine & Spirits Sale
d7j651,D-637/d7j651.ttl,1990,Sherry-Lehmann's First Wine Sale of the Decade (2 copies)
d7jd3b,D-637/d7jd3b.ttl,1972,"Sherry-Lehmann, Inc. Wine & Spirits Merchants Insert: ""November wine consumer prices will be higher..."""
d7jh20,D-637/d7jh20.ttl,1973,Sherry-Lehmann Inc. Wines & Spirits Merchants (European Wine Price Increase)
d7jp9c,D-637/d7jp9c.ttl,1991,Autumn 1991: Sherry-Lehmann Autumn Wine Sale Impressions of the Harvest By Wayne Ensrud
d7jt0b,D-637/d7jt0b.ttl,2000,Summer 2000: Sherry-Lehmann Summer Wine Sale Featuring Paintings of Paris' Celebrated Cafes by Wayne Ensrud
d7k06n,D-637/d7k06n.ttl,2010,Holiday 2010: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7k65b,D-637/d7k65b.ttl,1980,July 1980: Mid-Summer Sale Offering
d7k940,D-637/d7k940.ttl,1976,Xmas 1976: Season's Greetings From Sherry-Lehmann Inc.
d7kh29,D-637/d7kh29.ttl,1988,Sherry-Lehmann's Autumn Wine Sale
d7km1z,D-637/d7km1z.ttl,1993,Autumn 1993: Sherry-Lehmann's Autumn Wine Sale Featuring The Paintings of Le Marquis Roussy De Sales
d7ks9q,D-637/d7ks9q.ttl,2002,Summer 2002: www.Sherry-Lehmann.com Summer Wine Sale
d7kw8c,D-637/d7kw8c.ttl,2015,Holiday 2015: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7m648,D-637/d7m648.ttl,1978,Spring 1978: Start Saving Now -- Extended Until May 8th (two copies--see add. notes)
d7m949,D-637/d7m949.ttl,1974,July 1974: Summer-Fall Sale!
d7mh17,D-637/d7mh17.ttl,1977,July 1977: A MIDSOMMER Nights Dreame Comes True!
d7mm2n,D-637/d7mm2n.ttl,1997,Holiday 1997: Season's Greetings from Sherry-Lehmann
d7ms91,D-637/d7ms91.ttl,2004,Summer 2004: Sherry-Lehmann Celebrates 70 Years On Madison Avenue!
d7mw8p,D-637/d7mw8p.ttl,1977,Great Bargains of Bordeaux
d7n07n,D-637/d7n07n.ttl,1975,An Historic Wine Sale Despite World-Wide Inflation...
d7n369,D-637/d7n369.ttl,1975,Spring 1975: Our Annual Money-Saving Sale of Fine Wines and Spirits
d7n94m,D-637/d7n94m.ttl,1978,May 1978: Blue Sheet
d7nd38,D-637/d7nd38.ttl,1989,Holiday 1989: Season's Greetings from Sherry-Lehmann
d7nm1k,D-637/d7nm1k.ttl,1998,Spring 1998: Sherry-Lehmann's Spring Sale Featuring Wayne Ensrud's Paintings and an Introduction by Francis Ford Coppola
d7nq07,D-637/d7nq07.ttl,2005,Catalog 2005: www.Sherry-Lehmann.com 72nd Annual Winter Wine & Spirits Sale
d7p06k,D-637/d7p06k.ttl,1989,Sherry-Lehmann Wine Sale
d7p370,D-637/d7p370.ttl,1981,October Catalog 1981: Pre-Holiday Money-Saving Sale
d7p93j,D-637/d7p93j.ttl,1977,Wine Discovery of the Year!
d7pd4z,D-637/d7pd4z.ttl,1991,Summer 1991: Sherry-Lehmann Summer Wine Sale
d7pm1w,D-637/d7pm1w.ttl,2000,Spring 2000: Sherry-Lehmann Spring Wine Sale
d7pq0j,D-637/d7pq0j.ttl,2010,Summer 2010: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7pw89,D-637/d7pw89.ttl,1979,August 1979: An Historic Wine Event is Now Taking Place...
d7q36x,D-637/d7q36x.ttl,1976,September 1976: Vintage of Values!
d7q65k,D-637/d7q65k.ttl,1988,Sherry-Lehmann Turns Bordeaux Prices Back to the Days When the Dollar Was Strong
d7qd48,D-637/d7qd48.ttl,1993,Catalog 1993: Sherry-Lehmann's Advance Offering of The Domain De La Romanee-Conti 1991s
d7qh15,D-637/d7qh15.ttl,2002,Spring 2002: Sherry-Lehmann Spring Wine Sale
d7qq17,D-637/d7qq17.ttl,2015,Spring 2015: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7qw90,D-637/d7qw90.ttl,1978,March 1978: Start Saving Now
d7r35v,D-637/d7r35v.ttl,1974,Midwinter Annual Money-Saving Sale
d7r668,D-637/d7r668.ttl,1976,December 1976: Piper Heidsieck ( two copies of letter)
d7rd36,D-637/d7rd36.ttl,1997,Autumn 1997: Sherry-Lehmann Autumn Wine Sale
d7rh2v,D-637/d7rh2v.ttl,2004,"Summer 2004: www.Sherry-Lehmann.com Special Blue Ribbon Spring/Summer Delivery Service to The Hamptons, North Fork and Fire Island"
d7rq1j,D-637/d7rq1j.ttl,1995,Sherry-Lehmann's Spring Wine Sale
d7rw8x,D-637/d7rw8x.ttl,1973,"November 1973: Wine List Proudly Presented by Sherry-Lehmann, Inc."
d7s07w,D-637/d7s07w.ttl,1977,September 1977: Advance Offering of 1976 Red Burgundy
d7s66k,D-637/d7s66k.ttl,1989,Catalog 1989: Sherry-Lehmann Winter Sale
d7s93g,D-637/d7s93g.ttl,1998,Catalog 1998: Sherry-Lehmann's 64th Annual Mid-Winter Sale
d7sh3j,D-637/d7sh3j.ttl,2006,Holiday 2006: Season's Greetings from Sherry-Lehmann.com
d7sq1v,D-637/d7sq1v.ttl,1989,Fall 1989: Sherry-Lehmann Harvest Values
d7sw87,D-637/d7sw87.ttl,1981,April 1981: April Catalog
d7t076,D-637/d7t076.ttl,1990,September 1990: Domaine De La Romanee-Conti Mailing
d7t65h,D-637/d7t65h.ttl,1991,Spring 1991: Sherry-Lehmann Spring Wine Sale Featuring The Murals of Restaurant
d7t945,D-637/d7t945.ttl,2000,Catalog 2000: Sherry-Lehmann's 67th Annual Mid-Winter Sale
d7th2g,D-637/d7th2g.ttl,2010,Spring 2010: Sherry-Lehmann Wine and Spirits Merchants Since 1934
d7ts9w,D-637/d7ts9w.ttl,1976,A Private Sale: Outstanding Burgundies of the Great 1971 and 1972 Vintages (Alexis Lichine Selections)
d7v08w,D-637/d7v08w.ttl,1979,"An Up-To-date Wine Report from Sam Aaron, President of Sherry-Lehmann, Inc"
d7v35s,D-637/d7v35s.ttl,1994,Catalog 1994: Sherry-Lehmann Wine & Spirit Merchants Celebrates The 60th Anniversary of The Rainbow Room
d7v94g,D-637/d7v94g.ttl,2002,Catalog 2002: www.Sherry-Lehmann.com 68th Annual May Sale
d7vd2r,D-637/d7vd2r.ttl,2016,Holiday 2016: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7vh35,D-637/d7vh35.ttl,1976,"December 1976: Wine Caves, Inc. "
d7vq03,D-637/d7vq03.ttl,1977,Xmas 1977: Season's Greetings from Sherry-Lehmann (two copies)
d7vs96,D-637/d7vs96.ttl,1973,Xmas 1973 (Picasso): Season's Greetings From Sherry-Lehmann Inc
d7w07t,D-637/d7w07t.ttl,1976,"April 1976: Private Sale of Outstanding Bordeaux, Burgundy, Rhones, etc."
d7w36g,D-637/d7w36g.ttl,1997,"Summer 1997: Sherry-Lehmann ""Blue Ribbon"" Delivery Service To Your Summer Home"
d7w94s,D-637/d7w94s.ttl,2004,Spring 2004: Sherry-Lehmann.com Wine & Spirits Merchants Celebrating 70 Years on Madison Ave
d7wh3g,D-637/d7wh3g.ttl,1994,Sherry-Lehmann Wine & Spirits Merchants
d7wm0c,D-637/d7wm0c.ttl,1973,September 1973: The Great Wines of Germany on Sale
d7wt0f,D-637/d7wt0f.ttl,1977,Exciting Wine News For Those Happy People Summering On Long Island & In The Hamptons
d7ww7s,D-637/d7ww7s.ttl,1990,Holiday 1990: Seasons Greetings from Sherry-Lehmann Featuring Selections from The Corning Museum of Glass
d7x36s,D-637/d7x36s.ttl,1999,Holiday 1999: Millennium Greeting from Sherry-Lehmann
d7x65f,D-637/d7x65f.ttl,2006,Autumn 2006: Sherry-Lehmann.com Wine & Spirits Merchants Since 1934 (72nd Annual Autumn Sale)
d7xh2d,D-637/d7xh2d.ttl,1989,January 1989: Sherry-Lehmann Winter Sale
d7xm12,D-637/d7xm12.ttl,1980,1980 Xmas: Season's Greetings From Sherry-Lehmann Inc.
d7xs9t,D-637/d7xs9t.ttl,1990,Robert Mondavi Autographed Magnums Cabernet Sauvignon Reserve Available September 1990
d7xw8g,D-637/d7xw8g.ttl,1991,Catalog 1991: Sherry-Lehmann's Great Bordeaux Sale
d7z363,D-637/d7z363.ttl,2001,Holiday 2001: Season's Greetings from Sherry-Lehmann Featuring Hugh Johnson's & Jancis Robinson's New World Atlas of Wine 5th Addition
d7z65r,D-637/d7z65r.ttl,2011,Holiday 2011: Sherry-Lehmann Wine & Spirits Merchants Since 1934
d7zd2p,D-637/d7zd2p.ttl,1978,Xmas 1978: Christmas Dinner by James Beard (two copies)
d7zm1c,D-637/d7zm1c.ttl,1976,Fall 1976: Vintage of Values!
d7zp93,D-637/d7zp93.ttl,1978,Wine List Mailing
d7zw8s,D-637/d7zw8s.ttl,1996,Autumn 1995: Sherry-Lehmann Autumn Wine Sale Salutes The Top Ten Restaurants from Passport to New York Restaurants Through Carol Gillot's Illustrations
\.
