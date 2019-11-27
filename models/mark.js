const pg = require('../lib/pg');
const config = require('../lib/config');

class MarkModel {

  constructor() {
    this.TABLE = config.database.schema+'.mark';
    this.UPDATE_SET = ['parent_mark_id', 'top', 'left', 'bottom', 'right', 'section', 
      'wine_type', 'bottle_type', 'color', 'vintage', 'bottle_price', 'case_price'];
    this.UPDATE_SET_ARGS = this.UPDATE_SET.map((val, index) => '$'+(index+1));
  }

  updateMark(mark) {
    let result = pg.query(`select * from ${this.TABLE} where mark_id = $1`, [mark.mark_id]);
    if( result.rowCount === 1 ) {
      pg.query(`UPDATE ${this.TABLE} SET (${this.UPDATE_SET.join(', ')}) VALUES (${this.UPDATE_SET_ARGS})`, [mark.mark_id]);
    } else {

    }

  }

}