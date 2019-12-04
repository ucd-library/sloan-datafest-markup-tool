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

  app-mark-editor {
    position: absolute;
    width: 375px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 0 5px #888;
    right: -410px;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transition: right 200ms ease-out;
  }

  app-mark-editor[open] {
    right: 0;
  }

  @media(max-width: 800px) {
    app-mark-editor {
      bottom: -50vh;
      height: 50vh;
    }

    app-mark-editor[open] {
      right: 0;
      bottom: 0;
      left: 0;
      top: auto;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>  

<app-route .app-routes="${this.appRoutes}"></app-route>

<div class="layout">
  <app-leaflet-canvas></app-leaflet-canvas>
  <app-mark-editor></app-mark-editor>
</div>
`;}