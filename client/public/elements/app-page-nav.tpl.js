import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: inline-block;
  }

  .layout {
    display: flex;
  }

  iron-icon {
    cursor: pointer;
  }

  iron-icon[disabled] {
    cursor: not-allowed;
    color: #888;
  }
</style>  

<iron-icon icon="${this.icon}" ?disabled="${this.disabled}"></iron-icon>
`;}