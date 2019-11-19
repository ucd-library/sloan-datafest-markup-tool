const {BaseModel} = require('@ucd-lib/cork-app-utils');
const MarkService = require('../services/MarkService');
const MarkStore = require('../stores/MarkStore');
const uuid = require('uuid');

class MarkModel extends BaseModel {

  constructor() {
    super();

    this.store = MarkStore;
    this.service = MarkService;
      
    this.register('MarkModel');
  }

  async set(data) {
    if( !data.mark_id ) {
      data.mark_id = uuid.v4();
    }
    await this.service.set(data);
    return this.store.data[data.mark_id];
  }

}

module.exports = new MarkModel();