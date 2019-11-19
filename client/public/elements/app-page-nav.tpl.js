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
</style>  


<iron-icon icon="${this.icon}"></iron-icon>
`;}