const {AppStateModel} = require('@ucd-lib/cork-app-state');
const AppStateStore = require('../stores/AppStateStore');

class AppStateModelImpl extends AppStateModel {

  constructor() {
    super();
    this.store = AppStateStore;
  }


  set(state) {
    state = Object.assign({}, this.store.data, state);

    state.page = 'map';

    if( state.location.fullpath !== '/' ) {
      if( !state.history ) state.history = [];
      if( !state.history.includes(state.location.fullpath) ) {
        state.history.push(state.location.fullpath);
      }
    }

    if( state.location.fullpath.match(/\/collection\//) ) {
      state.selectedPage = state.location.fullpath;
    }

    return super.set(state);
  }

}

module.exports = new AppStateModelImpl();