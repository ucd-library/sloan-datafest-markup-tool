const {BaseService} = require('@ucd-lib/cork-app-utils');
const PageStore = require('../stores/PageStore');

class PageService extends BaseService {

  constructor() {
    super();
    this.store = PageStore;
  }

  getRandom() {
    return this.request({
      url : '/pgr/rpc/next_page',
      fetchOptions : {
        method : 'POST',
        body : {user_id: APP_CONFIG.user.username}
      },
      json : true,
      onLoading : request => this.store.onGetRandomLoading(request),
      onLoad : response => this.store.onGetRandomLoad({page_id: response.body}),
      onError : error => this.store.onGetRandomError(error)
    })

    // return this.request({
    //   url : '/api/page/random',
    //   json: true,
    //   onLoading : request => this.store.onGetRandomLoading(request),
    //   onLoad : response => this.store.onGetRandomLoad(response.body),
    //   onError : error => this.store.onGetRandomError(error)
    // });
  }

}

module.exports = new PageService();