const {BaseModel} = require('@ucd-lib/cork-app-utils');
const MarkService = require('../services/MarkService');
const MarkStore = require('../stores/MarkStore');
const AppStateModel = require('./AppStateModel');
const uuid = require('uuid');

class MarkModel extends BaseModel {

  constructor() {
    super();

    this.store = MarkStore;
    this.service = MarkService;
    
    this.userid = APP_CONFIG.user.username;

    this.register('MarkModel');
  }

  async setState(mark, state) {
    if( mark.payload ) mark = mark.payload;
    this.store.data[mark.page_id][mark.mark_id].renderState = state;

    let m;
    for( let pid in this.store.data ) {
      for( let mid in this.store.data[pid] ) {
        m = this.store.data[pid][mid];
        if( m.payload === mark ) continue;
        m.renderState = '';
      }
    }

    if( state ) AppStateModel.set({selectedMark: this.store.data[mark.page_id][mark.mark_id]});
    else AppStateModel.set({selectedMark: null});
  }

  async set(data) {
    if( data.payload ) data = data.payload;

    if( !data.mark_id ) {
      data.mark_id = uuid.v4();
    }
    data.user_id = this.userid;
    
    await this.service.set(data);
    
    return this.store.data[data.page_id][data.mark_id];
  }

  async delete(mark) {
    if( mark.payload ) mark = mark.payload;
    await this.service.delete(mark);

    let selectedMark = AppStateModel.store.data.selectedMark;
    if( selectedMark.payload === mark ) {
      AppStateModel.set({selectedMark: null});
    }

    return this.store.data[mark.page_id];
  }

}

module.exports = new MarkModel();