import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  .layout {
    position: relative;
    height: 100%;
  }

  app-leaflet-canvas {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

</style>  

<app-route .app-routes="${this.appRoutes}"></app-route>

<div class="layout">
  <app-leaflet-canvas></app-leaflet-canvas>
  <div class="controls"></div>
</div>
`;}