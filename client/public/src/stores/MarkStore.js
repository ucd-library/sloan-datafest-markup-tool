const {BaseStore} = require('@ucd-lib/cork-app-utils');

class MarkStore extends BaseStore {

  constructor() {
    super();

    this.data = {};
    this.pageLoading = {};

    this.events = {
      PAGE_MARKS_UPDATE : 'page-marks-update'
    };
  }

  setPageMarksLoading(pageId, request) {
    this.pageLoading[pageId] = request;
  }

  setPageMarksLoaded(pageId) {
    this.pageLoading[pageId] = null;
  }

  setMarkSaving(request, mark) {
    this._setMarkState({
      state : this.STATE.SAVING,
      payload : mark,
      request
    });
  }

  setMarkLoaded(mark) {
    this._setMarkState({
      state : this.STATE.LOADED,
      payload : mark
    });
  }

  setMarkDeleting(request, mark) {
    this._setMarkState({
      state : this.STATE.DELETING,
      request,
      payload : mark
    });
  }

  setMarkDeleteError(mark) {
    this._setMarkState({
      state : this.STATE.DELETE_ERROR,
      payload : mark
    });
  }

  setMarkDeleted(mark) {
    delete this.data[mark.page_id][mark.mark_id];
    this.emit(this.events.PAGE_MARKS_UPDATE, this.data[mark.page_id]);
  }

  setMarkSaveError(error, mark) {
    this._setMarkState({
      state : this.STATE.SAVE_ERROR,
      error : error,
      payload : mark
    });
  }

  _setMarkState(state) {
    if( !this.data[state.payload.page_id] ) {
      this.data[state.payload.page_id] = {};
    }

    if( this.data[state.payload.page_id][state.payload.mark_id] ) {
      let cmarkState = this.data[state.payload.page_id][state.payload.mark_id];
      for( let key in cmarkState ) {
        if( key === 'state' || key === 'payload' ) continue;
        state[key] = cmarkState[key];
      }
    }

    this.data[state.payload.page_id][state.payload.mark_id] = state;
    this.emit(this.events.PAGE_MARKS_UPDATE, this.data[state.payload.page_id]);
  }

}

module.exports = new MarkStore();