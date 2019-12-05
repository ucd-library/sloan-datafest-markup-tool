import { LitElement } from 'lit-element';
import render from "./app-leaflet-canvas.tpl.js"

import "leaflet"

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

    this.renderedPolygons = [];

    window.addEventListener('mousemove', e => this._onMouseMove(e));

    this._initMap();
  }

  _initMap() {
    this.viewer = L.map(this.$.map, {
      crs: L.CRS.Simple,
      minZoom: -4,
      zoomControl : false
    });
    this.viewer.on('click', e => this._onViewerClicked(e));
  }

  _onAppStateUpdate(e) {
    if( this.selectedMark !== e.selectedMark ) {
      this.drawingPolygon = null;
      this.drawingStart = null;
    }

    this.selectedMark = e.selectedMark;
    this.selectedMarkRenderState = e.selectedMarkRenderState;
    this.renderSelectedMark();

    if( !e.selectedPage ) return;
    if( e.selectedPage === this.selectedPage ) return;
    this.selectedPage = e.selectedPage;

    this.showImage(APP_CONFIG.damsHost+'/fcrepo/rest'+this.selectedPage);
  }

  async showImage(url) {
    this.currentUrl = url;
    if( this.overlay ) {
      this.viewer.removeLayer(this.overlay);
      this.overlay = null;
    }
    this.clearMarks();

    await this._loadImage(url);
    if( url !== this.currentUrl ) return;

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

  clearMarks() {
    for( let polygon of this.renderedPolygons ) {
      this.viewer.removeLayer(polygon);
    }
    this.renderedPolygons = [];
  }

  _onViewerClicked(e) {
    if( e.originalEvent ) e = e.originalEvent;

    if( !this.selectedMark ) return;
    if( this.selectedMarkRenderState !== 'drawing' ) return;

    let ll = this.viewer.containerPointToLatLng([e.x, e.y]);

    if( !this.drawingPolygon ) {
      this.drawingStart = ll;
      this.drawingPolygon = L.polygon([
        ll, ll, ll
      ], {color: '#18779B'}).addTo(this.viewer);
    } else {
      this.viewer.removeLayer(this.drawingPolygon);

      let mark = {
        top : this.bounds[1][0] - this.drawingStart.lat,
        left : this.drawingStart.lng,
        bottom : this.bounds[1][0] - ll.lat,
        right : ll.lng
      }

      if( mark.top > mark.bottom ) {
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

      if( this.selectedMark.payload.implicator_top === undefined || this.selectedMark.payload.implicator_top === null ) {
        this.selectedMark.payload.implicator_top = mark.top;
        this.selectedMark.payload.implicator_bottom = mark.bottom;
        this.selectedMark.payload.implicator_left = mark.left;
        this.selectedMark.payload.implicator_right = mark.right;
        this.renderSelectedMark();
      } else {
        this.selectedMark.payload.region_top = mark.top;
        this.selectedMark.payload.region_bottom = mark.bottom;
        this.selectedMark.payload.region_left = mark.left;
        this.selectedMark.payload.region_right = mark.right;
        this.selectedMark.matched = true;

        this.MarkModel.setState(this.selectedMark, null);
      }

      this.MarkModel.set(this.selectedMark);
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

  renderSelectedMark() {
    this.clearMarks();

    if( !this.selectedMark ) return;
    if( this.selectedMarkRenderState === '' ) return;

    let mark = this.selectedMark.payload;

    if( mark.implicator_top !== undefined && mark.implicator_top !== null ) {
      var tlIcon = L.divIcon({
        className: 'section-top-left',
        html : '<iron-icon icon="star"></iron-icon>'
      });
      this.selectedMark.mark = L.marker([this.bounds[1][0] - mark.implicator_top, mark.implicator_left], {icon: tlIcon}).addTo(this.viewer);
      this.renderedPolygons.push(this.selectedMark.mark);

      this.selectedMark.polygon = L.polygon([
        [this.bounds[1][0] - mark.implicator_top, mark.implicator_left], 
        [this.bounds[1][0] - mark.implicator_top, mark.implicator_right], 
        [this.bounds[1][0] - mark.implicator_bottom, mark.implicator_right],
        [this.bounds[1][0] - mark.implicator_bottom, mark.implicator_left]
      ],{mark, color: '#18779B'}).addTo(this.viewer);
      this.renderedPolygons.push(this.selectedMark.polygon);
    }

    if( mark.region_top !== undefined &&  mark.region_top !== null ) {
      this.selectedMark.regionPolygon = L.polygon([
        [this.bounds[1][0] - mark.region_top, mark.region_left], 
        [this.bounds[1][0] - mark.region_top, mark.region_right], 
        [this.bounds[1][0] - mark.region_bottom, mark.region_right],
        [this.bounds[1][0] - mark.region_bottom, mark.region_left]
      ],{mark, color: '#18779B'}).addTo(this.viewer);
      this.renderedPolygons.push(this.selectedMark.regionPolygon);
    }
    
  }


}

customElements.define('app-leaflet-canvas', AppLeafletCanvas);
