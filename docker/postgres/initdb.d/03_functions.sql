create or replace view datafest.page_everyone as
with p(page_ark,reason) AS ( VALUES
('d7tg6n-004','champagne'),
('d74s4s-027','Loire Valley')
)
select page_ark,c.year,c.name,
format('https://digital.ucdavis.edu/ark:/87287/%s/media/images/%s.jpg',
       regexp_replace(p.page_ark,'-.*',''),p.page_ark) as jpg
from p
join catalogs c on (regexp_replace(p.page_ark,'-.*','')=c.ark);

drop materialized view if exists datafest.page_price_p;
create materialized view datafest.page_price_p as
with a as (
 select t.page_ark
 from rtesseract.page t
 join datafest.page p on (t.page_ark=p.page_ark)
),
b as (
 select page_ark,count(*)
 from wine_search.price
 join a using (page_ark)
 group by page_ark
),
c as (
 select sum(count)
 from b
),
d as (
 select
 page_ark,
 case when (b is null) then 1000.0/c.sum else b.count*1000.0/c.sum end as prob
 from a
 left join b using (page_ark),c
)
select
 page_ark,
 prob,
 sum(prob) OVER (order by page_ark RANGE UNBOUNDED PRECEDING) as cum
 from d;

grant select on datafest.page_price_p to public;

CREATE or replace function
datafest.page_user_p (user_id varchar default 'anon')
RETURNS TABLE (
 page_ark varchar,
 prob float
)
LANGUAGE SQL AS $$
select
 p.page_ark,
 case when (m is null) then 1.0::float else 0.0::float end as prob
 from datafest.page p
 left join
 (
   select distinct page_id from datafest.mark where user_id=$1
 ) as m using (page_id)
$$;

DROP function if exists datafest.next_page(varchar);
CREATE function datafest.next_page(user_id varchar DEFAULT 'anon')
RETURNS varchar
LANGUAGE SQL AS $$
with pr as (
 select
 page_ark,
 p.prob*u.prob as prob,
 sum(p.prob*u.prob) OVER (order by page_ark RANGE UNBOUNDED PRECEDING) as cum
 from datafest.page_price_p p
 join page_user_p('quinn') u using (page_ark)
 where u.prob>0 and p.prob>0
),
r as (
 select random()*max(cum) as ran from pr
)
select page_id
from pr join datafest.page p on (pr.page_ark=p.page_ark),r
where cum<r.ran
order by cum desc
limit 1
$$;

create or replace function implicator_text (m in datafest.mark, t out text)
LANGUAGE SQL IMMUTABLE AS $$
select string_agg(w.text,' ' order by w.word_id)
from rtesseract.word w where (m.page_ark=w.page_ark and st_intersects(m.implicator_bbox,w.bbox));
$$;

create or replace function region_text (m in datafest.mark, t out text)
LANGUAGE SQL IMMUTABLE AS $$
select string_agg(w.text,' ' order by w.word_id)
from rtesseract.word w where (m.page_ark=w.page_ark and st_intersects(m.region_bbox,w.bbox));
$$;
