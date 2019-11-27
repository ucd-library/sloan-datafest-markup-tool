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
    background-color: #3e9b96;
    border-radius: 16px;
    margin: -44px 0 0 -12px;
    padding: 5px;
  }
</style>

<div id="map"></div>

`;}