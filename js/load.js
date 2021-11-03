import { renderMarkers } from './map.js';

const getAdverts = () =>
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => renderMarkers(data));

getAdverts();
