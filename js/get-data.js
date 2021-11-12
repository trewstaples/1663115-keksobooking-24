import { renderMarkers, deleteMarkers, mapFilters } from './map.js';
import { debounce } from './utils/debounce.js';

const ADVERT_COUNT = 10;
const ALERT_SHOW_TIME = 3000;

const Price = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
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

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const filterWiFi = document.querySelector('#filter-wifi');
const filterDishwasher = document.querySelector('#filter-dishwasher');
const filterParking = document.querySelector('#filter-parking');
const filterWasher = document.querySelector('#filter-washer');
const filterElevator = document.querySelector('#filter-elevator');
const filterConditioner = document.querySelector('#filter-conditioner');

const setMapFiltersClick = (adverts) => {
  mapFilters.addEventListener('change', (evt) => {
    const selectedType = housingType.value;
    const selectedPrice = housingPrice.value;
    const selectedRooms = housingRooms.value;
    const selectedGuests = housingGuests.value;

    const filterByFeature = (advert, filter) => {
      if (filter.checked && advert.offer.features) {
        return advert.offer.features.includes(filter.value);
      }
      return false;
    };

    const getAdvertRank = (advert) => {
      let rank = 0;

      if (filterByFeature(advert, filterWiFi) === true) {
        rank += 1;
      }

      if (filterByFeature(advert, filterDishwasher) === true) {
        rank += 1;
      }

      if (filterByFeature(advert, filterParking) === true) {
        rank += 1;
      }

      if (filterByFeature(advert, filterWasher) === true) {
        rank += 1;
      }

      if (filterByFeature(advert, filterElevator) === true) {
        rank += 1;
      }

      if (filterByFeature(advert, filterConditioner) === true) {
        rank += 1;
      }

      return rank;
    };

    const compareAdverts = (advertA, advertB) => {
      const rankA = getAdvertRank(advertA);
      const rankB = getAdvertRank(advertB);

      return rankB - rankA;
    };

    const getType = (option, type) => {
      switch (option) {
        case 'any':
          return type;
        default:
          return type === option;
      }
    };

    const getPrice = (option, price) => {
      switch (option) {
        case 'any':
          return price;
        case Price.LOW:
          return price < 10000;
        case Price.MIDDLE:
          return price > 10000 && price < 50000;
        case Price.HIGH:
          return price > 50000;
      }
    };

    const getCapacity = (option, items) => {
      switch (option) {
        case 'any':
          return items;
        default:
          return items === Number(option);
      }
    };
    //Найти элемент, на котором произошёл клик. evt.target.id
    const evtFilterID = evt.target.id;
    //Записать в enum-объект типы изменений
    const Filters = {
      HOUSING: 'housing-type',
      PRICE: 'housing-price',
      ROOMS: 'housing-rooms',
      GUESTS: 'housing-guests',
      WIFI: 'filter-wifi',
      DISHWASHER: 'filter-dishwasher',
      PARKING: 'filter-parking',
      WASHER: 'filter-washer',
      ELEVATOR: 'filter-elevator',
      CONDITIONER: 'filter-conditioner',
    };

    console.log(adverts);

    //Написать две функции
    // Первая функция проверяет по условию элементы переданного ей массива данных
    //Написать функцию
    //Написать условие проверки элементов
    const checkCondition = () => {};

    // Вторая функция с циклом. Цикл добавляет в переданный в функцию массив элементы, прошедшие проверку
    //
    if (evtFilterID === Filters.PRICE) {
      for (let i = 0; i <= adverts.length - 1; i++) {
        const isPriceSimillar = getPrice(selectedPrice, adverts[i].offer.price);
        if (isPriceSimillar || isPriceSimillar === 'any') {
          newFiltered.push(adverts[i]);
        }
      }
      console.log(newFiltered);
    }

    if (evtFilterID === Filters.ROOMS) {
      for (let i = 0; i <= adverts.length - 1; i++) {
        const isRoomsSimillar = getCapacity(selectedRooms, adverts[i].offer.rooms);
        if (isRoomsSimillar || isRoomsSimillar === 'any') {
          newFiltered.push(adverts[i]);
        }
      }
      console.log(newFiltered);
    }

    if (evtFilterID === Filters.GUESTS) {
      for (let i = 0; i <= adverts.length - 1; i++) {
        const isGuestsSimillar = getCapacity(selectedGuests, adverts[i].offer.guests);
        if (isGuestsSimillar || isGuestsSimillar === 'any') {
          newFiltered.push(adverts[i]);
        }
      }
      console.log(newFiltered);
    }

    deleteMarkers();
    const filteredAdverts = adverts
      .filter((advert) => getType(selectedType, advert.offer.type))
      .filter((advert) => getPrice(selectedPrice, advert.offer.price))
      .filter((advert) => getCapacity(selectedRooms, advert.offer.rooms))
      .filter((advert) => getCapacity(selectedGuests, advert.offer.guests))
      .slice()
      .sort(compareAdverts);

    const filterAdverts = debounce(() => renderMarkers(filteredAdverts.slice(0, ADVERT_COUNT)));
    filterAdverts();
  });
};

let ads = [];
const onDownloadSuccess = (data) => {
  ads = data.slice();
  renderMarkers(ads.slice(0, ADVERT_COUNT));
  setMapFiltersClick(data);
};

export { onDownloadError, onDownloadSuccess };
