const MAX_ADVERTS = 10;
const DEFAULT_VALUE = 'any';

const priceMap = {
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

  'housing-price': (data, filter) => data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end,

  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),

  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),

  'housing-features': (data, filter) => {
    const checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

    //Записывам в массив все выбранные чекбосы
    //.every - для каждого чекбокса проверяем
    //.some есть ли в массиве фич текущего объявления
    //feature === checkbox.value элемент равный значению чекбокса
    if (data.offer.features) {
      return checkListElements.every((checkbox) => data.offer.features.some((feature) => feature === checkbox.value));
    }
  },
};

const filterData = (data) => {
  const filteredAdverts = [];
  let i = 0;
  let result;

  while (i < data.length && filteredAdverts.length < MAX_ADVERTS) {
    result = filters.every((filter) => (filter.value === DEFAULT_VALUE ? true : filterRules[filter.id](data[i], filter)));

    if (result) {
      filteredAdverts.push(data[i]);
    }
    i++;
  }
  return filteredAdverts;
};

export { filterData };
