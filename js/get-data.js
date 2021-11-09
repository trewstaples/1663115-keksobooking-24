import { renderMarkers, deleteMarkers, mapFilters } from './map.js';

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

const Types = {
  housing: 'housing-type',
  price: 'housing-price',
  rooms: 'housing-rooms',
  guests: 'housing-guests',
};

const onDownloadSuccess = (data) => {
  adverts = data.slice();
  console.log(adverts);
  renderMarkers(adverts.slice(0, ADVERT_COUNT));

  mapFilters.addEventListener('change', (evt) => {
    const changeType = evt.target.id;
    const changeOption = evt.target.value;
    console.log(changeOption);

    if (changeType === Types.housing) {
      deleteMarkers();
      const flatAdverts = adverts.filter((advert) => advert.offer.type === changeOption);
      renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
    } else if (changeType === Types.price) {
      const getPrice = (option, price) => {
        switch (option) {
          case 'any':
            return price;
          case 'low':
            return price < 10000;
          case 'middle':
            return price > 10000 && price < 50000;
          case 'high':
            return price > 50000;
        }
      };

      deleteMarkers();
      const flatAdverts = adverts.filter((advert) => getPrice(changeOption, advert.offer.price));
      renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
    } else if (changeType === Types.rooms) {
      const getRooms = (option, rooms) => {
        switch (option) {
          case 'any':
            return rooms;
          default:
            return rooms === Number(option);
        }
      };

      deleteMarkers();
      const flatAdverts = adverts.filter((advert) => getRooms(changeOption, advert.offer.rooms));
      renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
    } else if (changeType === Types.guests) {
      const getGuests = (option, guests) => {
        switch (option) {
          case 'any':
            return guests;
          default:
            return guests === Number(option);
        }
      };

      deleteMarkers();
      const flatAdverts = adverts.filter((advert) => getGuests(changeOption, advert.offer.guests));
      renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
    } else {
      console.log('Изменеён какой-то другой тип');
    }
  });
};

export { onDownloadError, onDownloadSuccess };
