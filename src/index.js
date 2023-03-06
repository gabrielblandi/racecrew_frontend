import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { encode as base64_encode, decode as base64_decode } from 'base-64';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.js';
import ComponentSelector from './components/ComponentSelector/ComponentSelector';

const urlParams = new URLSearchParams(window.location.search);

const RenderArray = base64_decode(urlParams.get('Instance')).split(",");

let url = window.location.href;

if (!url.includes('?') || urlParams.get('Instance') === '') {

  let RedirectTo = base64_encode('HomePage');

  document.location.href = '/?Instance=' + RedirectTo;
  
}

ReactDOM.render(
  <React.StrictMode >

    <ComponentSelector Render={RenderArray} />

  </React.StrictMode>,
  document.getElementById('root')
);
