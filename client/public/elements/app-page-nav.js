import { LitElement } from 'lit-element';
import render from "./app-page-nav.tpl.js"

import "@polymer/iron-icons"

export default class AppPageNav extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      next : {type: Boolean},
      disabled : {type: Boolean},
      icon : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.next = false;
    this.disabled = true;
    this.icon = '';

    this._injectModel('AppStateModel', 'PageModel');

    this.addEventListener('click', e => this._onClick(e));
  }

  firstUpdated() {
    if( this.next ) this.icon = 'arrow-forward';
    else this.icon = 'arrow-back';
  }

  _onAppStateUpdate(e) {
    this.history = e.history;
    this.selectedPage = e.selectedPage;

    if( this.next ) {
      this.disabled = false;
      return;
    }

    let index = (this.history || []).indexOf(this.selectedPage);
    this.disabled = (index <= 0);
  }

  async _onClick() {
    if( this.disabled ) return;

    let index = (this.history || []).indexOf(this.selectedPage);

    if( this.next ) {
      if( index !== -1 && index <= this.history.length-2 ) {
        this.AppStateModel.setLocation(this.history[index+1]);
      } else {
        let page = await this.PageModel.getRandom();
        this.AppStateModel.setLocation(page.payload.page_id);
      }
    } else if( index > 0 ) {
      this.AppStateModel.setLocation(this.history[index-1]);
    }

  }

}

customElements.define('app-page-nav', AppPageNav);
