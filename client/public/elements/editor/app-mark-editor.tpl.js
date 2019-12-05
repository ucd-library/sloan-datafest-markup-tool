import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
    padding: 10px;
    overflow-y: auto;
  }

  .input {
    padding: 10px;
  }

  input[type="text"], input[type="number"] {
    display: block;
    font-size: 16px;
    border: 0;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100%;
    margin-top: 5px;
    line-height: 30px;
  }

  h2 {
    display: flex;
    border-bottom: 1px solid white;
    padding-bottom: 3px;
    padding-right: 10px;
    align-items: center;
  }

  h2 a {
    font-size: 14px;
    color : var(--app-primary-color);
    text-decoration: none;
  }

  button {
    background-color: transparent;
    border: 1px solid white;
    border-radius: 6px;
    color: white;
    padding: 5px;
    font-size: 22px;
  }

  .delete {
    margin-top: 15px;
    padding-top: 15px; 
    text-align: right;
    border-top: 1px solid white;
  }

  .help {
    color: #ddd;
    font-size: 12px;
  }

  .layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .btn-layout {
    display: flex;
  }
</style>  

<div class="layout">
  <div style="overflow: auto; flex: 1">
    <h2 style="border: none;">
      <div style="flex:1">Mark Sections</div>
      <a href="/logout"><iron-icon icon="exit-to-app" style="vertical-align: bottom"></iron-icon> Logout</a>
    </h2>

    <div class="input">
      <app-multi-input 
        property="wine_type" 
        label="Wine Type" 
        type="select" 
        .options="${this.wineTypes}">
      </app-multi-input>
    </div>

    <div class="input">
      <app-multi-input property="color" label="Wine Color" type="select" .options="${this.wineColors}" ></app-multi-input>
    </div>

    <div class="input">
      <app-multi-input property="bottle_price" label="Price Per Bottle" type="number" ></app-multi-input>
    </div>

    <div class="input">
      <app-multi-input property="country" label="Country" type="text" ></app-multi-input>
    </div>

    <div class="input">
      <app-multi-input property="vintage" label="Vintage" type="number" ></app-multi-input>
    </div>

    <div class="input">
      <app-multi-input property="case_price" label="Price Per Case" type="number" ></app-multi-input>
    </div>

    <div class="input">
      <app-multi-input property="bottle_type" label="Bottle Type" type="select" .options="${this.bottleSizes}" ></app-multi-input>
    </div>
  </div>

  <div class="btn-layout">
    <div>
      <app-page-nav></app-page-nav>
    </div>
    <div style="flex:1; text-align:center">Logged in as: ${this.username}</div>
    <div>
      <app-page-nav next></app-page-nav>
    </div>
  </div>
</div>

`;}