const {BaseModel} = require('@ucd-lib/cork-app-utils');
const MarkService = require('../services/MarkService');
const MarkStore = require('../stores/MarkStore');
// const AppStateModel = require('./AppStateModel');
const uuid = require('uuid');

class MarkModel extends BaseModel {

  constructor() {
    super();

    this.store = MarkStore;
    this.service = MarkService;
    
    this.userid = APP_CONFIG.user.username;

    this.register('MarkModel');
    this.inject('AppStateModel');
  }

  async setState(mark, state) {
    if( mark.payload ) mark = mark.payload;

    if( state ) {
      this.AppStateModel.set({
        selectedMark: this.store.data[mark.page_id][mark.mark_id],
        selectedMarkId: mark.mark_id,
        selectedMarkRenderState: state
      });
    } else {
      this.AppStateModel.set({selectedMark: null, selectedMarkId: null, selectedMarkRenderState: null});
    }
  }

  async getPageMarks(pageId) {
    let loading = this.store.pageLoading[pageId];

    if( loading ) {
      await loading;
    } else {
      await this.service.getUserPageMarks(pageId, APP_CONFIG.user.username);
    }

    return this.store.data[pageId] || {};
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

    let selectedMark = this.AppStateModel.store.data.selectedMark;
    if( selectedMark && selectedMark.payload === mark ) {
      this.AppStateModel.set({selectedMark: null});
    }

    return this.store.data[mark.page_id];
  }

}

module.exports = new MarkModel();