import { toggleFormState, toggleFiltersState, adForm, mapFilters, minHousePrice } from './form.js';
import { createAdvert } from './adverts.js';
import { debounce } from './debounce.js';
import { filterData } from './filter.js';
import { request } from './request.js';

const ADVERT_COUNT = 10;
const DECIMALS_NUMBER = 5;
const ALERT_SHOW_TIME = 3000;

const Map = {
  SCALE: 10,
  ADDRESS: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  LAT: 35.681729,
  LNG: 139.753927,
};

const MainMarker = {
  IMAGE: './img/main-pin.svg',
  GENERAL_IMAGE: './img/pin.svg',
  WIDTH: 52,
  HEIGHT: 52,
};

const GeneralMarker = {
  IMAGE: './img/pin.svg',
  WIDTH: 40,
  HEIGHT: 40,
};

const map = L.map('map-canvas');
L.tileLayer(Map.ADDRESS, Map.ATTRIBUTION).addTo(map);

const mainIcon = L.icon({
  iconUrl: MainMarker.IMAGE,
  iconSize: [MainMarker.WIDTH, MainMarker.HEIGHT],
  iconAnchor: [MainMarker.WIDTH / 2, MainMarker.HEIGHT],
});

const mainMarker = L.marker(
  {
    lat: Map.LAT,
    lng: Map.LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

const setMainMarkerAddress = () => {
  mainMarker.setLatLng({ lat: Map.LAT, lng: Map.LNG });
};
setMainMarkerAddress();

const mapAddress = document.querySelector('#address');
const setMapAddress = () => {
  mapAddress.value = `${Map.LAT.toFixed(DECIMALS_NUMBER)}, ${Map.LNG.toFixed(DECIMALS_NUMBER)}`;
};
setMapAddress();

const getMainMarkerAddress = (address) => {
  mapAddress.value = `${address.lat.toFixed(DECIMALS_NUMBER)}, ${address.lng.toFixed(DECIMALS_NUMBER)}`;
};

mainMarker.on('move', (evt) => {
  getMainMarkerAddress(evt.target.getLatLng());
});

const generalIcon = L.icon({
  iconUrl: GeneralMarker.IMAGE,
  iconSize: [GeneralMarker.WIDTH, GeneralMarker.HEIGHT],
  iconAnchor: [GeneralMarker.WIDTH / 2, GeneralMarker.HEIGHT],
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

const onDownloadError = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Ошибка. Данные не удалось загрузить :(';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

let offers = [];

const onMapFiltersChange = debounce(() => {
  removeMarkers();
  renderMarkers(filterData(offers));
});

const inputPrice = adForm.querySelector('#price');
const resetPage = () => {
  adForm.reset();
  mapFilters.reset();
  inputPrice.placeholder = minHousePrice.flat;
  inputPrice.min = minHousePrice.flat;
  setMainMarkerAddress();
  setMapAddress();
  map.closePopup();
  onMapFiltersChange();
};

const onDownloadSuccess = (data) => {
  toggleFiltersState();
  offers = data.slice();

  renderMarkers(offers.slice(0, ADVERT_COUNT));

  mapFilters.addEventListener('change', onMapFiltersChange);

  const resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage(offers);
  });
};

map
  .on('load', () => {
    toggleFormState();
    request(onDownloadSuccess, onDownloadError, 'GET');
  })
  .setView(
    {
      lat: Map.LAT,
      lng: Map.LNG,
    },
    Map.SCALE,
  );

export { ADVERT_COUNT, resetPage };
