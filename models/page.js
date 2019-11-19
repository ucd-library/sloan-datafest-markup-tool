const pg = require('../lib/pg');
const config = require('../lib/config');

class PageModel {

  async getRandom() {
    if( !this.pageCount ) {
      this.pageCount = await pg.query(`select count(*) as count from ${config.database.schema}.page`);
      this.pageCount = this.pageCount.rows[0].count;
    }

    let random = Math.floor(Math.random()*this.pageCount);
    let page = await pg.query(`select * from ${config.database.schema}.page offset ${random} limit 1`);

    return page.rows[0];
  }

  getPageImageUrl(pageId, size=',1000') {
    if( !pageId.startsWith('/') ) pageId = '/'+pageId;
    return `${config.dams.host}/fcrepo/rest${pageId}/svc:iiif/full/${size}/0/default.jpg`
  }

}

module.exports = new PageModel();