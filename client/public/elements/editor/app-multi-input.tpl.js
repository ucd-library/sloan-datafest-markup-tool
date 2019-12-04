import { html } from 'lit-element';
import sharedStyles from '../styles/shared-styles'

export default function render() { 
return html`

${sharedStyles}
<style>
  :host {
    display: block;
  }

  .row {
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    padding: 5px;
  }

  .row[render-state="none"]:hover {
    cursor: pointer;
    border: 1px solid var(--app-primary-color);
  }

  .row[selected] {
    background-color: white;
    border: 1px solid var(--app-primary-color);
    color: var(--app-primary-color);
    font-weight: bold;
  }

  .title {
    display: flex;
    cursor: pointer;
  }

  .title iron-icon {
    transform: rotate(-90deg);
  }

  .title iron-icon[open] {
    transform: rotate(0deg);
  }

  .body {
    padding-left: 25px;
  }

  .input {
    flex: 1;
  }

  .new-entry {
    margin-top: 20px;
    padding-left: 7px;
    font-size: 16px;
    color: var(--app-primary-color);
    cursor: pointer;
  }
  .new-entry:hover, .new-entry:focus {
    font-weight: bold;
  }

  iron-icon[icon="delete-forever"] {
    cursor: pointer;
  }

  iron-icon[icon="star"], iron-icon[icon="add"], iron-icon[icon="create"] {
    color: white;
    background-color: var(--app-primary-color);
    border-radius: 16px;
    margin: 4px;
    padding: 5px;
  }

  span.unmatched {
    cursor: pointer;
    display: block;
    height: 34px;
    width: 34px;
    border-radius: 16px;
    background: #ccc;
    margin: 4px;
  }


</style>  

<div class="title" @click="${this._onToggleClicked}">
  <div><iron-icon ?open="${this.open}" icon="arrow-drop-down"></iron-icon></div>
  <div>${this.label}</div>
</div>
<div class="body" ?hidden="${!this.open}">
  <div>
    ${this.values.map((item, index) => html`
      <div class="row" @click="${this._onRowClicked}" index="${index}" render-state="${this.getItemRenderState(item)}" ?selected="${this.renderSelected(item)}">
        <div>${this.renderIcon(item, index)}</div>
        <div class="input" index="${index}">${this.renderLabel(item, index)}</div>
        <div>${this.renderButton(item, index)}</div>
      </div>
    `)}
  </div>
  <div ?hidden="${this.creating}" tabindex="1" @click="${this._onCreateClicked}" class="new-entry">
    <iron-icon icon="add"></iron-icon> New Entry
  </div>
</div>

`;}