import { renderMarkers } from './map.js';
import { request } from './request.js';

const ADVERT_COUNT = 10;
const ALERT_SHOW_TIME = 3000;

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

let adverts = [];

const onDownloadSuccess = (data) => {
  adverts = data.slice();
  renderMarkers(adverts.slice(0, ADVERT_COUNT));
};

request(onDownloadSuccess, onDownloadError, 'GET');
