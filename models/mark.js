const pg = require('../lib/pg');
const config = require('../lib/config');

class MarkModel {

  constructor() {
    this.TABLE = config.database.schema+'.mark';

    this.UPDATE_SET = ['page_id', 'user_id', 'type',
      'implicator_top', 'implicator_left', 'implicator_bottom', 'implicator_right',  
      'region_top', 'region_left', 'region_bottom', 'region_right',  
      'wine_type', 'bottle_type', 'color', 'vintage', 'country',
      'bottle_price', 'case_price', 'section_title'];
    this.INSERT_SET = this.UPDATE_SET.concat(['mark_id']);
  }

  _mapProperties(mark, set, indexOffset=0) {
    let placeholders = [];
    let values = [];

    set.forEach((prop, index) => {
      placeholders.push('$'+(index+indexOffset+1));
      values.push(mark[prop] === undefined ? null : mark[prop]);
    });

    return {
      properties: set.join(', '),
      placeholders: placeholders.join(', '),
      values
    }
  }

  async update(mark) {
    let result = await pg.query(`select * from ${this.TABLE} where mark_id = $1`, [mark.mark_id]);

    if( result.rowCount === 1 ) {
      let {properties, placeholders, values} = this._mapProperties(mark, this.UPDATE_SET);
      return pg.query(`UPDATE ${this.TABLE} SET (${properties}) = (${placeholders}) where mark_id = $${(values.length+1)}`, values.concat([mark.mark_id]));
    } else {
      let {properties, placeholders, values} = this._mapProperties(mark, this.INSERT_SET);
      return pg.query(`INSERT INTO ${this.TABLE} (${properties}) VALUES (${placeholders})`, values);
    }
  }

  delete(markId, userId) {
    return pg.query(`DELETE FROM ${this.TABLE} WHERE mark_id = $1 AND user_id = $2`, [markId, userId]);
  }

}

module.exports = new MarkModel();