import { LitElement } from 'lit-element';
import render from "./datafest-markup-app.tpl.js"

import "@ucd-lib/cork-app-utils"
import "../src"

import "./app-leaflet-canvas"
import "./editor/app-mark-editor"

export default class DatafestMarkupApp extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      appRoutes : {type: Array},
      editingMark : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.appRoutes = APP_CONFIG.appRoutes;
    this.editingMark = false;

    this._injectModel('AppStateModel');
  }

  _onAppStateUpdate(e) {
    this.editingMark = e.selectedMark ? true : false;
  }

}

customElements.define('datafest-markup-app', DatafestMarkupApp);