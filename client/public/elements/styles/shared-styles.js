  
import { html } from 'lit-element';

export default html`
<style>
  [hidden] {
    display: none !important;
  }

  button {
    background-color: var(--app-primary-color);
    color: white;
    border-radius: 0;
    padding: 6px 10px;
    height: 40px;
    font-size: 16px;
    border: none;
  }

  select, input[type="text"], input[type="number"] {
    border-radius: 0;
    height: 34px;
    font-size: 20px;
    min-width: 150px;
    background-color: white;
  }

  select {
    height: 40px;
  }

</style>
`;