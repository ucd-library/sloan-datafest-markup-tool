import { LitElement } from 'lit-element';
import render from "./app-leaflet-canvas.tpl.js"

import "leaflet"
import "./app-page-nav"

export default class AppLeafletCanvas extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      loading : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this._injectModel('AppStateModel');
  }

  firstUpdated() {
    this.$ = {
      map : this.shadowRoot.querySelector('#map')
    }

    this._initMap();
  }

  _initMap() {
    this.viewer = L.map(this.$.map, {
      crs: L.CRS.Simple,
      minZoom: -4,
      zoomControl : false
    });

    L.Control.AppNav = L.Control.extend({
      onAdd: function(map) {
        let ele = L.DomUtil.create('app-page-nav');
        if( this.options.next ) ele.setAttribute('next', 'true');
        return ele;
      },
  
      onRemove: function(map) {}
    });
    L.control.appNav = function(opts) {
      return new L.Control.AppNav(opts);
    }
    L.control.appNav({ position: 'bottomleft'}).addTo(this.viewer);
    L.control.appNav({ position: 'bottomright', next: true  }).addTo(this.viewer);
  }

  _onAppStateUpdate(e) {
    if( !e.selectedPage ) return;
    if( e.selectedPage === this.selectedPage ) return;
    this.selectedPage = e.selectedPage;

    this.showImage('/api/page/image'+this.selectedPage);
  }

  async showImage(url) {
    if( this.overlay ) {
      this.viewer.removeLayer(this.overlay);
      this.overlay = null;
    }

    await this._loadImage(url);

    this.overlay = L.imageOverlay(url, this.bounds).addTo(this.viewer);
    this.viewer.fitBounds(this.bounds);
  }

  /**
   * @method _loadImage
   * @description preload image and set bounds to image dimensions
   * 
   * @param {String} url url of image to load
   * 
   * @returns {Promise} resolves when image is loaded and bounds array has been set
   */
  _loadImage(url) {
    this.loading = true;

    return new Promise((resolve, reject) => {
      var img = new Image();

      img.onload = () => {
        let res = [img.naturalHeight, img.naturalWidth];
        this.bounds = [[0,0], res];
        this.loading = false;
        resolve();
      };

      img.src = url;
    });
  }

}

customElements.define('app-leaflet-canvas', AppLeafletCanvas);
