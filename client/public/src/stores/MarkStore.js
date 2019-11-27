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

  setMarkDeleted(mark) {
    delete this.data[mark.page_id][mark.mark_id];
    this.emit(this.events.PAGE_MARKS_UPDATE, this.data[mark.page_id]);
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