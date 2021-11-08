import { renderMarkers, deleteMarkers } from './map.js';

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

const housingType = document.querySelector('#housing-type');

const onDownloadSuccess = (data) => {
  adverts = data.slice();
  console.log(adverts);
  renderMarkers(adverts.slice(0, ADVERT_COUNT));

  housingType.addEventListener('change', (evt) => {
    const typeOfHouse = evt.target.value;
    deleteMarkers();
    const flatAdverts = adverts.filter((advert) => advert.offer.type === typeOfHouse);
    renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
  });
};

export { onDownloadError, onDownloadSuccess };
