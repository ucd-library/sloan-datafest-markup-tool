CREATE function page_ark (in datafest.page, out varchar)
LANGUAGE SQL IMMUTABLE AS $$
SELECT regexp_replace($1.page_id,'.*/(.*).jpg','\1');
$$;

CREATE function page_ark (in datafest.mark, out varchar)
LANGUAGE SQL IMMUTABLE AS $$
SELECT regexp_replace($1.page_id,'.*/(.*).jpg','\1');
$$

create materialized view datafest.page_price_p as
with a as (
 select t.ark as page_ark
 from tesseract.pages t
 join datafest.page p on (t.ark=p.page_ark)
),
b as (
 select page_ark,count(*)
 from wine_search.prices
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
select page_ark
from pr,r
where cum<r.ran
order by cum desc
limit 1
$$
