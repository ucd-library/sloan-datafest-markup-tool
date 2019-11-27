import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .row[selected] {
    border: 1px solid red;
  }

  .title {
    display: flex;
  }

  .title iron-icon {
    transform: rotate(-90deg);
  }

  .title iron-icon[open] {
    transform: rotate(0deg);
  }

  iron-icon[icon="star"], iron-icon[icon="add"], iron-icon[icon="create"] {
    color: white;
    background-color: #3e9b96;
    border-radius: 16px;
    margin: 4px;
    padding: 5px;
  }

  span.unmatched {
    cursor: pointer;
    display: block;
    height: 24px;
    width: 24px;
    border-radius: 16px;
    background: #ccc;
    margin: 4px;
  }


</style>  

<div class="title">
  <div><iron-icon @click="${this._onToggleClicked}" ?open="${this.open}" icon="arrow-drop-down"></iron-icon></div>
  <div>${this.label}</div>
</div>
<div>
  ${this.values.map((item, index) => html`
    <div class="row" @click="${this._onRowClicked}" index="${index}" ?selected="${this.renderSelected(item)}">
      <div>${this.renderIcon(item, index)}</div>
      <div class="input" index="${index}">${this.renderLabel(item, index)}</div>
      <div>${this.renderButton(item, index)}</div>
    </div>
  `)}
</div>
<div ?hidden="${this.creating}">
  <button @click="${this._onCreateClicked}">New Entry</button>
</div>

`;}