import { togglePageState, adForm, mapFilters } from './form.js';
import { createAdvert } from './adverts.js';
import { onDownloadError, onDownloadSuccess } from './get-data.js';
import { request } from './request.js';

const ADVERT_COUNT = 10;
const MAP_SCALE = 10;
const MAP_ADDRESS = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
const MAIN_MARKER_IMAGE = './img/main-pin.svg';
const GENERAL_MARKER_IMAGE = './img/pin.svg';
const NUMBER_OF_DECIMALS = 5;

const MapCenterCoordinates = {
  LAT: 35.681729,
  LNG: 139.753927,
};

const MarkerSizes = {
  WIDTH: 52,
  HEIGHT: 52,
};

const map = L.map('map-canvas');

L.tileLayer(MAP_ADDRESS, MAP_ATTRIBUTION).addTo(map);

const mainIcon = L.icon({
  iconUrl: MAIN_MARKER_IMAGE,
  iconSize: [MarkerSizes.WIDTH, MarkerSizes.HEIGHT],
  iconAnchor: [MarkerSizes.WIDTH / 2, MarkerSizes.HEIGHT],
});

const mainMarker = L.marker(
  {
    lat: MapCenterCoordinates.LAT,
    lng: MapCenterCoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

const setMainMarkerAddress = () => {
  mainMarker.setLatLng({ lat: MapCenterCoordinates.LAT, lng: MapCenterCoordinates.LNG });
};

const mapAddress = document.querySelector('#address');
const setMapAdress = () => {
  mapAddress.value = `${MapCenterCoordinates.LAT.toFixed(NUMBER_OF_DECIMALS)}, ${MapCenterCoordinates.LNG.toFixed(NUMBER_OF_DECIMALS)}`;
};
setMapAdress();

const getMainMarkerAdress = (address) => {
  mapAddress.value = `${address.lat.toFixed(NUMBER_OF_DECIMALS)}, ${address.lng.toFixed(NUMBER_OF_DECIMALS)}`;
};

mainMarker.on('moveend', (evt) => {
  getMainMarkerAdress(evt.target.getLatLng());
});

const generalIcon = L.icon({
  iconUrl: GENERAL_MARKER_IMAGE,
  iconSize: [MarkerSizes.WIDTH, MarkerSizes.HEIGHT],
  iconAnchor: [MarkerSizes.WIDTH / 2, MarkerSizes.HEIGHT],
});

const markers = [];
const renderMarkers = (adverts) => {
  adverts.forEach((advert) => {
    const marker = L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon: generalIcon,
      },
    );
    markers.push(marker);
    marker.addTo(map).bindPopup(createAdvert(advert));
  });
};

const removeMarkers = () => {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
};

const resetPage = (adverts) => {
  adForm.reset();
  mapFilters.reset();
  setMainMarkerAddress();
  setMapAdress();
  map.closePopup();
  removeMarkers();
  renderMarkers(adverts.slice(0, ADVERT_COUNT));
};

map
  .on('load', () => {
    togglePageState();
    request(onDownloadSuccess, onDownloadError, 'GET');
  })
  .setView(
    {
      lat: MapCenterCoordinates.LAT,
      lng: MapCenterCoordinates.LNG,
    },
    MAP_SCALE,
  );

export { renderMarkers, resetPage, map, removeMarkers, adForm, mapFilters, setMainMarkerAddress as setMainMarkerAdress, setMapAdress };
