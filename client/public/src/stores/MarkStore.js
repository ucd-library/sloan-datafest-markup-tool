const {BaseStore} = require('@ucd-lib/cork-app-utils');

class MarkStore extends BaseStore {

  constructor() {
    super();

    this.data = {};
    this.events = {
      PAGE_MARKS_UPDATE : 'page-marks-update'
    };
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

  setMarkSaveError(mark) {
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
    this.data[state.payload.page_id][state.payload.mark_id] = state;
    this.emit(this.events.PAGE_MARKS_UPDATE, this.data[state.payload.page_id]);
  }

}

module.exports = new MarkStore();