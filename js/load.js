import { renderMarkers } from './map.js';

const ADVERT_COUNT = 10;
const ALERT_SHOW_TIME = 3000;

const showDownloadErrorAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getAdverts = () =>
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((adverts) => {
      renderMarkers(adverts.slice(0, ADVERT_COUNT));
    })
    .catch(() => {
      showDownloadErrorAlert('Ошибка. Данные не удалось загрузить :(');
    });

getAdverts();
