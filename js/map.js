import { setDisabledState, togglePageState } from './form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    togglePageState();
  })
  .setView(
    {
      lat: 35.65283,
      lng: 139.83947,
    },
    12
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
