const {BaseService} = require('@ucd-lib/cork-app-utils');
const MarkStore = require('../stores/MarkStore');

class MarkService extends BaseService {

  constructor() {
    super();
    this.store = MarkStore;
  }

  set(mark) {
    // don't save yet
    console.log(mark[mark.type], mark);
    if( !mark[mark.type] ) {
      this.store.setMarkLoaded(mark);
      return;
    }

    return this.request({
      url : '/api/mark/',
      fetchOptions : {
        method : 'POST',
        body : mark
      },
      json: true,
      onLoading : request => this.store.setMarkSaving(request, mark),
      onLoad : () => this.store.setMarkLoaded(mark),
      onError : e => this.store.setMarkSaveError(e, mark)
    });
  }

  delete(mark) {
    return this.request({
      url : `/api/mark/${mark.mark_id}`,
      fetchOptions : {
        method : 'DELETE'
      },
      onLoading : request => this.store.setMarkDeleting(request, mark),
      onLoad : () => this.store.setMarkDeleted(mark),
      onError : e => this.store.setMarkDeleteError(e, mark)
    });
  }

  getUserPageMarks(pageId, userId) {
    return this.request({
      url: '/pgr/mark',
      qs : {
        user_id : 'eq.'+userId,
        page_id : 'eq.'+pageId
      },
      onLoading : request => this.store.setPageMarksLoading(pageId, request),
      onLoad : resp => {
        resp.body.forEach(mark => this.store.setMarkLoaded(mark));
        this.store.setPageMarksLoaded(pageId);
      },
      onError : e => this.store.setPageMarksLoaded(pageId)
    });
  }

}

module.exports = new MarkService();