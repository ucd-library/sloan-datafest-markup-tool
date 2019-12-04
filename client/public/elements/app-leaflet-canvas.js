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

    // L.Control.AppNav = L.Control.extend({
    //   onAdd: function(map) {
    //     let ele = L.DomUtil.create('app-page-nav');
    //     if( this.options.next ) ele.setAttribute('next', 'true');
    //     return ele;
    //   },
  
    //   onRemove: function(map) {}
    // });
    // L.control.appNav = function(opts) {
    //   return new L.Control.AppNav(opts);
    // }
    // L.control.appNav({ position: 'bottomleft'}).addTo(this.viewer);
    // L.control.appNav({ position: 'bottomright', next: true  }).addTo(this.viewer);
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
    if( this.overlay ) {
      this.viewer.removeLayer(this.overlay);
      this.overlay = null;
    }
    this.clearMarks();

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
      ]).addTo(this.viewer);
    } else {
      this.viewer.removeLayer(this.drawingPolygon);

      let mark = {
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

      if( this.selectedMark.payload.top === undefined ) {
        this.selectedMark.payload = Object.assign(this.selectedMark.payload, mark);
        this.renderSelectedMark();
      } else {
        this.selectedMark.payload.region = mark;
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

    if( mark.top !== undefined ) {
      var tlIcon = L.divIcon({
        className: 'section-top-left',
        html : '<iron-icon icon="star"></iron-icon>'
      });
      this.selectedMark.mark = L.marker([this.bounds[1][0] - mark.top, mark.left], {icon: tlIcon}).addTo(this.viewer);
      this.renderedPolygons.push(this.selectedMark.mark);

      this.selectedMark.polygon = L.polygon([
        [this.bounds[1][0] - mark.top, mark.left], 
        [this.bounds[1][0] - mark.top, mark.right], 
        [this.bounds[1][0] - mark.bottom, mark.right],
        [this.bounds[1][0] - mark.bottom, mark.left]
      ],{mark}).addTo(this.viewer);
      this.renderedPolygons.push(this.selectedMark.polygon);
    }

    if( mark.region && mark.region.top !== undefined ) {
      this.selectedMark.regionPolygon = L.polygon([
        [this.bounds[1][0] - mark.region.top, mark.region.left], 
        [this.bounds[1][0] - mark.region.top, mark.region.right], 
        [this.bounds[1][0] - mark.region.bottom, mark.region.right],
        [this.bounds[1][0] - mark.region.bottom, mark.region.left]
      ],{mark}).addTo(this.viewer);
      this.renderedPolygons.push(this.selectedMark.regionPolygon);
    }

    // mark.polygon.on('click', e => this._onPolygonClicked(e));
    // mark.region.polygon.on('click', e => this._onPolygonClicked(e));

    
  }

  // _onPolygonClicked(e) {
  //   L.DomEvent.stopPropagation(e);
  //   L.DomEvent.preventDefault(e);

  //   if( !this.selectedMark ) {
  //     this._selectPolygon(e.target.options.mark);
  //     return;
  //   }

  //   if( !this.selectedMark.section ) {
  //     this._selectPolygon(e.target.options.mark);
  //     return;
  //   }

  //   this.MarkModel.toggleParent(e.target.options.mark, this.selectedMark);
  // }

  // _selectPolygon(selectedMark) {
  //   if( this.selectMarkTimer ) {
  //     clearTimeout(this.selectedMarkTimer);
  //   }

  //   this.selectMarkTimer = setTimeout(() => {
  //     this.selectMarkTimer = false;
  //     this._selectPolygonAsync(selectedMark);
  //   }, 50);
  // }

  // _selectPolygon(selectedMark) {
  //   for( let mark of this.marks ) {
  //     if( mark === selectedMark ) continue;
  //     mark.selected = false;
  //     mark.polygon.setStyle({
  //       fillColor : '#3388ff',
  //       color: '#3388ff'
  //     });
  //   }

  //   if( selectedMark ) {
  //     selectedMark.selected = true;
  //     if( selectedMark.polygon ) {
  //       selectedMark.polygon.setStyle({
  //         fillColor : 'red',
  //         color : 'red'
  //       });

  //       if( selectedMark.section ) {
  //         let cll = selectedMark.polygon.getBounds().getCenter();

  //         for( let mark of this.marks ) {
  //           if( mark.parent_mark_id === selectedMark.mark_id ) {
  //             mark.polygon.setStyle({color: 'orange', fillColor: 'orange'});
  //             let polyline = L.polyline(
  //               [cll, mark.polygon.getBounds().getCenter()], 
  //               {color: 'red'}
  //             ).addTo(this.viewer);
  //             this.connectionLines.push(polyline);
  //           }
  //         }
  //       }
  //     }

  //     this.AppStateModel.set({selectedMark});
  //   } else {
  //     for( let line of this.connectionLines ) {
  //       this.viewer.removeLayer(line);
  //     }
  //     this.connectionLines = [];
  //   }
  // }

}

customElements.define('app-leaflet-canvas', AppLeafletCanvas);
