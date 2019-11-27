const {BaseService} = require('@ucd-lib/cork-app-utils');
const MarkStore = require('../stores/MarkStore');

class MarkService extends BaseService {

  constructor() {
    super();
    this.store = MarkStore;
  }

  set(data) {
    this.store.setMarkLoaded(data);
  }

  delete(data) {
    this.store.setMarkDeleted(data);
  }

}

module.exports = new MarkService();