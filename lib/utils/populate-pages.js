const config = require('../config');
const requestCb = require('request');
const {Client} = require('pg');
const parseXmlString = require('xml2js').parseString;

const crawlAttributes = ['hasPart', 'associatedMedia']
const IMAGE_LIST = 'http://digital.ucdavis.edu/schema#ImageList';
const SITE_MAP_URL = config.dams.host+config.dams.collection.replace('collection/', 'sitemap-')+'.xml';
const schema = 'data'

async function run() {

  let response = await request(SITE_MAP_URL);
  let catalogs = await getCatalogs(response.body);

  const pgclient = new Client();
  await pgclient.connect();

  await pgclient.query(`DELETE FROM ${config.database.schema}.page`);
  await pgclient.query(`DELETE FROM ${config.database.schema}.catalog`);

  for( let catalog of catalogs ) {
    catalog = await getCatalogPages(catalog);

    await pgclient.query(`INSERT INTO ${config.database.schema}.catalog (catalog_id, name) VALUES ($1, $2)`, [catalog.id, catalog.name]);
    if( !catalog.pages ) {
      console.warn('catalog '+catalog.id+' has no pages');
      continue;
    }

    for( let page of catalog.pages ) {
      await pgclient.query(`INSERT INTO  ${config.database.schema}.page (catalog_id, page_id, index) VALUES ($1, $2, $3)`, [catalog.id, page.id, page.index]);
    }
  }

  await pgclient.end();
}

function getCatalogs(xml) {
  return new Promise((resolve, reject) => {
    parseXmlString(xml, (error, result) => {
      if( error ) return reject(error);
      resolve(result.urlset.url.map(item => item.loc[0]));
    })
  });
}

async function getCatalogPages(url) {
  let id = url.replace(config.dams.host, '');
  url = config.dams.host+config.dams.api.rootRecordPath+id+'?root=true';
  let response = await request(url);
  let rootRecord = JSON.parse(response.body);

  return {
    id : rootRecord['@id'],
    name : rootRecord.name,
    pages : getImageList(rootRecord)
  }
}

function getImageList(record) {
  if( !record['@id'] || !record['@type'] ) return;

  if( record['@type'].includes(IMAGE_LIST) ) {
    return record.hasPart;
  }

  for( let attr of crawlAttributes ) {
    if( !record[attr] ) continue;

    for( let child of record[attr] ) {
      let list = getImageList(child);
      if( list ) return list.map(item => ({
        id: item['@id'],
        index: parseInt(item.position)
      }));
    }
  }
}

function request(uri, opts={}) {
  return new Promise((resolve, reject) => {
    requestCb(uri, opts, (error, response) => {
      if( error ) reject(error);
      else resolve(response);
    })
  });
}

run();