import { html } from 'lit-element';

import leafletCss from "leaflet/dist/leaflet.css"

export default function render() { 
return html`

<style>${leafletCss}</style>
<style>
  :host {
    display: block;
  }

  #map {
    height: 100%;
  }

  iron-icon[icon="star"] {
    color: white;
    background-color: var(--app-primary-color);
    border-radius: 16px;
    margin: -10px 0 0 -10px;
    padding: 5px;
  }
</style>

<div id="map"></div>

`;}