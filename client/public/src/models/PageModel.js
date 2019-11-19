const {BaseModel} = require('@ucd-lib/cork-app-utils');
const PageService = require('../services/PageService');
const PageStore = require('../stores/PageStore');
const AppStateModel = require('./AppStateModel');

class PageModel extends BaseModel {

  constructor() {
    super();

    this.store = PageStore;
    this.service = PageService;

    this.EventBus.on('app-state-update', e => this.onAppStateUpdate(e));

    this.register('PageModel');
  }

  async onAppStateUpdate(e) {
    if( e.location.fullpath !== '/' ) return;
    let randomPage = await this.getRandom();
    AppStateModel.setLocation(randomPage.payload.page_id);
  }

  async getRandom() {
    await this.service.getRandom();
    return this.store.data.randomPage
  }

}

module.exports = new PageModel();