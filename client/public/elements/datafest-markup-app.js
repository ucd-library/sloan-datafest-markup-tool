import { LitElement } from 'lit-element';
import render from "./datafest-markup-app.tpl.js"

import "@ucd-lib/cork-app-utils"
import "../src"

import "./app-leaflet-canvas"

export default class DatafestMarkupApp extends LitElement {

  static get properties() {
    return {
      appRoutes : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.appRoutes = APP_CONFIG.appRoutes;
  }

}

customElements.define('datafest-markup-app', DatafestMarkupApp);
