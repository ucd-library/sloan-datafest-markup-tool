const {BaseService} = require('@ucd-lib/cork-app-utils');
const PageStore = require('../stores/PageStore');

class PageService extends BaseService {

  constructor() {
    super();
    this.store = PageStore;
  }

  getRandom() {
    return this.request({
      url : '/api/page/random',
      json: true,
      onLoading : request => this.store.onGetRandomLoading(request),
      onLoad : response => this.store.onGetRandomLoad(response.body),
      onError : error => this.store.onGetRandomError(error)
    })
  }

}

module.exports = new PageService();