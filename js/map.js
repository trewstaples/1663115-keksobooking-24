import { togglePageState } from './form.js';

const MAP_SCALE = 10;
const MAIN_PIN_IMAGE = './img/main-pin.svg';

const MarkerCoordinates = {
  LAT: 35.62606,
  LNG: 139.77081,
};

const MarkerSizes = {
  WIDTH: 52,
  HEIGHT: 52,
};

const map = L.map('map-canvas')
  .on('load', () => {
    togglePageState();
  })
  .setView(
    {
      lat: MarkerCoordinates.LAT,
      lng: MarkerCoordinates.LNG,
    },
    MAP_SCALE
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_IMAGE,
  iconSize: [MarkerSizes.WIDTH, MarkerSizes.HEIGHT],
  iconAnchor: [MarkerSizes.WIDTH / 2, MarkerSizes.HEIGHT],
});

const mainMarker = L.marker(
  {
    lat: MarkerCoordinates.LAT,
    lng: MarkerCoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});
