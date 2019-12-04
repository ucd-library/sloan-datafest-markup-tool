import { LitElement, html } from 'lit-element';
import render from "./app-multi-input.tpl.js"


export default class AppMultiInput extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      property : {type: String},
      label : {type: String},
      type : {type: String},
      options : {type: Array},
      values : {type: Array},
      creating : {type: Boolean},
      open : {type: Boolean}
    }
  }

  constructor() {
    super();

    this.values = [];
    this.options = [];
    this.creating = false;
    this.open = false;

    this._injectModel('AppStateModel', 'MarkModel');
    this.render = render.bind(this);
  }

  _onAppStateUpdate(e) {
    // on page change, grab current marks
    if( e.selectedPage !== this.selectedPage ) {
      this.selectedPage = e.selectedPage;

      let pageMarks = this.MarkModel.getPageMarks(this.selectedPage);
      let values = [];
      for( let mid in pageMarks ) {
        if( pageMarks[mid].payload.type === this.property ) {
          values.push(pageMarks[mid]);
        }
      }
      this.values = values;
    }

    let localMark = this.values.find(m => m.payload.mark_id === e.selectedMarkId);

    if( this.creating && !localMark) {
      this.MarkModel.delete(this.selectedMark);
    }

    this.creating = false;

    if( this.selectedMarkId === e.selectedMarkId && 
      this.selectedMarkRenderState === e.selectedMarkRenderState ) return;

    this.selectedMark = e.selectedMark;
    this.selectedMarkId = e.selectedMarkId;
    this.selectedMarkRenderState = e.selectedMarkRenderState;
    
    this.requestUpdate();

    if( !localMark ) return;
    this.creating = (this.selectedMarkRenderState === 'creating');
  }

  _onToggleClicked() {
    this.open = !this.open;
  }

  updated() {
    if( this.setFocus ) {
      this.setFocus = false;
      let input = this.shadowRoot.querySelector(`.input > input`);
      if( !input ) input = this.shadowRoot.querySelector(`.input > select`);
      input.focus();
    }
  }

  _onPageMarksUpdate(e) {
    let values = [];

    for( let mid in e ) {
      if( this.selectedPage !== e[mid].payload.page_id ) {
        continue;
      }
      if( e[mid].payload.type === this.property ) {
        values.push(e[mid]);
      }
    }

    this.values = values;
  }

  getItemRenderState(item) {
    if( !this.selectedMark ) return 'none';
    if( item.payload.mark_id !== this.selectedMark.payload.mark_id ) return 'none';
    return this.selectedMarkRenderState;
  }

  renderSelected(item) {
    let renderState = this.getItemRenderState(item);
    return (renderState === 'selected') || (renderState === 'drawing');
  }

  renderLabel(item, index) {
    let renderState = this.getItemRenderState(item);
    if( renderState === 'creating' ) {
      return this.renderInput(index);
    }
    return html`<span>${item.payload[item.payload.type]}</span>`;
  }

  renderInput(index) {
    if( this.type === 'text' || !this.type ) {
      this.setFocus = true;
      return html`<input type="text" index="${index}" @keyup="${this._onInputKeyUp}" />`;
    } else if( this.type === 'number' ) {
      this.setFocus = true;
      return html`<input type="number" index="${index}" @keyup="${this._onInputKeyUp}" />`;
    } else if( this.type === 'select' ) {
      this.setFocus = true;
      return html`<select index="${index}">
        ${this.options.map(value => html`<option value="${value}">${value}</option>`)}
      </select>`;
    }
    return html`<span>Unknown type ${this.type}</span>`;
  }

  renderIcon(item, index) {
    let renderState = this.getItemRenderState(item);
    if( item.payload.region_top !== undefined && item.payload.region_top !== null ) {
      return html`<iron-icon icon="star"></iron-icon>`;
    } else if( renderState === 'creating' ) {
      return html`<iron-icon icon="add"></iron-icon>`;
    } else if( renderState === 'drawing' ) {
      return html`<iron-icon icon="create"></iron-icon>`;
    }
    return html`<span class="unmatched" tabindex="1" index="${index}" @click="${this._onUnmatchedClicked}"></span>`;
  }

  renderButton(item, index) {
    let renderState = this.getItemRenderState(item);
    if( renderState === 'creating' ) {
      return html`<button @click="${this._onSaveClicked}" index="${index}">Save</button>`;
    }
    return html`<iron-icon @click="${this._onDeleteClicked}" index="${index}" icon="delete-forever"></iron-icon>`;
  }

  _onUnmatchedClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.MarkModel.setState(this.values[index], 'drawing');
  }

  _onRowClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    if( this.values[index] === this.selectedMark && this.selectedMarkRenderState ) return;
    this.MarkModel.setState(this.values[index], 'selected');
  }

  _onInputKeyUp(e) {
    if( e.which !== 13 ) return;
    this._onSaveClicked(e);
  }

  _onSaveClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let input = this.shadowRoot.querySelector(`.input > [index="${index}"]`);

    if( !input.value ) {
      return this.MarkModel.delete(this.values[index]);
    }

    this.values[index].payload[this.property] = input.value;

    this.MarkModel.set(this.values[index]);
    this.MarkModel.setState(this.values[index], 'drawing');
  }

  _onCreateClicked() {
    let mark = {
      page_id: this.selectedPage,
      type: this.property
    };

    this.MarkModel.set(mark);
    this.MarkModel.setState(mark, 'creating');
  }

  _onDeleteClicked(e) {
    e.preventDefault();
    e.stopPropagation();

    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.MarkModel.delete(this.values[index]);
  }

}

customElements.define('app-multi-input', AppMultiInput);
