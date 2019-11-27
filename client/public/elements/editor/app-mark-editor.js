import { LitElement } from 'lit-element';
import render from "./app-mark-editor.tpl.js"

import "./app-multi-input"

export default class AppMarkEditor extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      isSection : {type: Boolean},
      color: {type: String},
      wineType : {type: String},
      vintage : {type: Number},
      bottlePrice : {type: Number},
      casePrice : {type: Number},
      bottleType : {type: String},

      wineTypes : {type: Array},
      wineColors : {type: Array},
      bottleSizes : {type: Array},

      open : {
        type: Boolean,
        reflect : true
      }
    }
  }

  constructor() {
    super();
    
    this.wineColors = ['red', 'white', 'rosé'];
    this.wineTypes = ['still', 'sparkling', 'fortified'];
    this.bottleSize = ["Balthazar", "Chopine", "Clavelin", "Demi", "Fifth", "Goliath", "Half Bottle", "Imperial", "Jennie", "Jeroboam", "Litre", "Magnum", "Marie Jeanne", "McKenzie", "Melchior", "Melchizedek", "Methuselah", "Midas", "Nebuchadnezzar", "Piccolo", "Pint", "Pinte", "Pony", "Primat", "Quart", "Quarter", "Quarter Bottle", "Rehoboam", "Salmanazar", "Snipe", "Solomon", "Sovereign", "Split", "Standard", "Tenth", "Tenths"];

    this.isSection = false;
    this.color = '';
    this.wineType = '';
    this.vintage = '';
    this.bottlePrice = '';
    this.casePrice = '';
    this.bottleType = '';
    this.open = true;

    this.render = render.bind(this);

    this._injectModel('AppStateModel', 'MarkModel');
  }

  _onAppStateUpdate(e) {
    if( this.selectedMark === e.selectedMark ) return;
    this.selectedMark = e.selectedMark;

    if( !this.selectedMark ) return;

    this.isSection = this.selectedMark.section || false;
    this.color = this.selectedMark.color || '';
    this.wineType = this.selectedMark.wine_type || '';
    this.vintage = this.selectedMark.vintage || '';
    this.bottlePrice = this.selectedMark.bottle_price || '';
    this.casePrice = this.selectedMark.case_price || '';
    this.bottleType = this.selectedMark.bottle_type || '';
  }

  _onMarkSelect(e) {
    let mark = e.detail;
    this.AppStateModel.set({selectedMark: mark});
  }

  _onPageMarksUpdate(e) {
    this.marks = Object.values(e).map(item => item.payload);
  }

  _onSectionChange(e) {
    let checked = e.currentTarget.checked ? true : false;
    let hasChild;

    if( !checked ) {
      hasChild = this.marks.find(mark => mark.parent_mark_id === this.selectedMark.mark_id);
      if( hasChild && !confirm('Are you sure what want to change this section back to a normal mark?  All child relations will be removed.') ) {
        e.currentTarget.checked = true;
        return;
      }
    }

    this.isSection = checked;
    this.selectedMark.section = this.isSection;

    if( !checked && hasChild ) {
      for( let mark of this.marks ) {
        if( mark.parent_mark_id === this.selectedMark.mark_id ) {
          mark.parent_mark_id = null;
          this.MarkModel.set(mark);
        }
      }
    }

    this.MarkModel.set(this.selectedMark);
  }

  _onColorChange(e) {
    this.color = e.currentTarget.value;
    this.selectedMark.color = this.color;
    this.MarkModel.set(this.selectedMark);
  }

  _onWineTypeChange(e) {
    this.wineType = e.currentTarget.value;
    this.selectedMark.wine_type = this.wineType;
    this.MarkModel.set(this.selectedMark);
  }

  _onVintageChange(e) {
    this.vintage = e.currentTarget.value;
    this.selectedMark.vintage = parseInt(this.vintage);
    this.MarkModel.set(this.selectedMark);
  }

  _onBottlePriceChange(e) {
    this.bottlePrice = e.currentTarget.value;
    this.selectedMark.bottle_price = parseFloat(this.bottlePrice);
    this.MarkModel.set(this.selectedMark);
  }

  _onCasePriceChange(e) {
    this.casePrice = e.currentTarget.value;
    this.selectedMark.case_price = parseFloat(this.casePrice);
    this.MarkModel.set(this.selectedMark);
  }

  _onBottleTypeChange(e) {
    this.bottleType = e.currentTarget.value;
    this.selectedMark.bottle_type = parseFloat(this.bottleType);
    this.MarkModel.set(this.selectedMark);
  }

  _onDoneClicked() {
    this.AppStateModel.set({selectedMark: null});
  }

  _onDeleteClicked() {
    this.MarkModel.delete(this.selectedMark);
    this.AppStateModel.set({selectedMark: null});
  }

}

customElements.define('app-mark-editor', AppMarkEditor);
