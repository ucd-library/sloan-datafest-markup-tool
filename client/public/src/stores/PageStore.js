const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PageStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      randomPage : null
    };

    this.events = {
      GET_RANDOM_PAGE_UPDATE : 'get-random-page-update'
    };
  }

  onGetRandomLoading(request) {
    this._setGetRandomState({
      state : this.STATE.LOADING,
      request
    });
  }

  onGetRandomLoad(payload) {
    this._setGetRandomState({
      state : this.STATE.LOADED,
      payload
    });
  }

  onGetRandomError(error) {
    this._setGetRandomState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setGetRandomState(state) {
    this.data.randomPage = state;
    this.emit(this.events.GET_RANDOM_PAGE_UPDATE, state);
  }

}

module.exports = new PageStore();