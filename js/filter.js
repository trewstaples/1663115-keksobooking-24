import { ADVERT_COUNT } from './map.js';

const DEFAULT_VALUE = 'any';

const mapPrice = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: Infinity,
  },
};

const filters = Array.from(document.querySelector('.map__filters').children);

const filterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,

  'housing-price': (data, filter) => data.offer.price >= mapPrice[filter.value].start && data.offer.price < mapPrice[filter.value].end,

  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),

  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),

  'housing-features': (data, filter) => {
    if (data.offer.features) {
      const checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
      return checkListElements.every((checkbox) => data.offer.features.some((feature) => feature === checkbox.value));
    } else {
      return false;
    }
  },
};

const filterData = (data) => {
  const filteredAdverts = [];
  let i = 0;
  let result;

  while (i < data.length && filteredAdverts.length < ADVERT_COUNT) {
    result = filters.every((filter) => (filter.value === DEFAULT_VALUE ? true : filterRules[filter.id](data[i], filter)));

    if (result) {
      filteredAdverts.push(data[i]);
    }
    i++;
  }
  return filteredAdverts;
};

export { filterData };
