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
    this._injectModel('AppStateModel', 'MarkModel');
  }

  firstUpdated() {
    this.$ = {
      map : this.shadowRoot.querySelector('#map')
    }

    this.marks = [];
    window.addEventListener('mousemove', e => this._onMouseMove(e));

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

    this.showImage(APP_CONFIG.damsHost+'/fcrepo/rest'+this.selectedPage);
  }

  async showImage(url) {
    if( this.overlay ) {
      this.viewer.removeLayer(this.overlay);
      this.overlay = null;
    }
    this.clearMarks();

    await this._loadImage(url);

    this.overlay = L.imageOverlay(url, this.bounds).addTo(this.viewer);
    this.viewer.fitBounds(this.bounds);
  }

  clearMarks() {
    for( let mark of this.marks ) {
      this.viewer.removeLayer(mark.polygon);
    }
    this.marks = [];
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

  _onViewerClicked(e) {
    let ll = this.viewer.containerPointToLatLng([e.x, e.y]);

    if( !this.drawingPolygon ) {
      this.drawingStart = ll;
      this.drawingPolygon = L.polygon([
        ll, ll, ll
      ]).addTo(this.viewer);
    } else {
      this.viewer.removeLayer(this.drawingPolygon);

      let mark = {
        page_id : this.selectedPage,
        top : this.bounds[1][0] - this.drawingStart.lat,
        left : this.drawingStart.lng,
        bottom : this.bounds[1][0] - ll.lat,
        right : ll.lng
      }

      if( mark.top < mark.bottom ) {
        let tmp = mark.top
        mark.top = mark.bottom;
        mark.bottom = tmp;
      }
      if( mark.right < mark.left ) {
        let tmp = mark.right
        mark.right = mark.left;
        mark.left = tmp;
      }

      this.drawingPolygon = null;
      this.drawingStart = null;

      this.MarkModel.set(mark);
    }
  }

  _onMouseMove(e) {
    if( !this.drawingPolygon ) return;
    let ll = this.viewer.containerPointToLatLng([e.x, e.y]);

    this.drawingPolygon.setLatLngs([
      this.drawingStart,
      [this.drawingStart.lat, ll.lng],
      ll,
      [ll.lat, this.drawingStart.lng]
    ])
  }

  _onPageMarksUpdate(e) {
    this.clearMarks();

    for( let id in e ) {
      let mark = e[id].payload;

      mark.polygon = L.polygon([
        [this.bounds[1][0] - mark.top, mark.left], 
        [this.bounds[1][0] - mark.top, mark.right], 
        [this.bounds[1][0] - mark.bottom, mark.right],
        [this.bounds[1][0] - mark.bottom, mark.left]
      ]).addTo(this.viewer);

      this.marks.push(mark);
    }
  }

}

customElements.define('app-leaflet-canvas', AppLeafletCanvas);
