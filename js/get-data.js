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

  const getType = (option, type) => {
    switch (option) {
      case 'any':
        return type;
      default:
        return type === option;
    }
  };

  housingType.addEventListener('change', (evt) => {
    const typeOfHouse = evt.target.value;
    deleteMarkers();
    const flatAdverts = adverts.filter((advert) => getType(typeOfHouse, advert.offer.type));
    renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
  });

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

  const housingPrice = document.querySelector('#housing-price');
  housingPrice.addEventListener('change', (evt) => {
    const priceOfHouse = evt.target.value;
    deleteMarkers();
    const flatAdverts = adverts.filter((advert) => getPrice(priceOfHouse, advert.offer.price));
    renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
  });

  const getRooms = (option, rooms) => {
    switch (option) {
      case 'any':
        return rooms;
      case '1':
        return rooms === 1;
      case '2':
        return rooms === 2;
      case '3':
        return rooms === 3;
    }
  };

  const housingRooms = document.querySelector('#housing-rooms');
  housingRooms.addEventListener('change', (evt) => {
    const roomsOfHouse = evt.target.value;
    deleteMarkers();
    const flatAdverts = adverts.filter((advert) => getRooms(roomsOfHouse, advert.offer.rooms));
    renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
  });

  const getGuests = (option, guests) => {
    switch (option) {
      case 'any':
        return guests;
      case '1':
        return guests === 1;
      case '2':
        return guests === 2;
      case '0':
        return guests === 0;
    }
  };

  const housingGuests = document.querySelector('#housing-guests');
  housingGuests.addEventListener('change', (evt) => {
    const guestsOfHouse = evt.target.value;
    deleteMarkers();
    const flatAdverts = adverts.filter((advert) => getGuests(guestsOfHouse, advert.offer.guests));
    renderMarkers(flatAdverts.slice(0, ADVERT_COUNT));
  });
};

export { onDownloadError, onDownloadSuccess };
