import { LitElement } from 'lit-element';
import render from "./datafest-markup-app.tpl.js"


export default class DatafestMarkupApp extends LitElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

}

customElements.define('datafest-markup-app', DatafestMarkupApp);
