const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomPositiveInteger();

const getRandomPositiveFloat = (min, max, decimalCount) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  const number = Math.random() * (max - min + 1) + min;
  return number.toFixed(decimalCount);
};
getRandomPositiveFloat();

const ADVERT_COUNT = 10;
const MIN_ADVERT_PRICE = 0;
const MAX_ADVERT_PRICE = 1000000000;
const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 3;
const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 3;
const MIN_LAT_VALUE = 35.65;
const MAX_LAT_VALUE = 35.7;
const MIN_LNG_VALUE = 139.7;
const MAX_LNG_VALUE = 139.8;

const ADVERT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECK_IN_AND_OUT_TIME = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = [
  'Цикады весной!Вижу папоротник глянцевитый — просвет в чащобе…',
  'Фор­ма де­вять на трёх А4.Со­рок пять че­ло­век на две­на­дца­ти мет­рах.Пу­сто в да­лё­ком ауле.',
  'Вместе с хозяином дома. Слушаю молча вечерний звон. Падают листья ивы.',
  'Умный дом. Вечерним вьюнком, Я в плен захвачен… Недвижно Стою в забытьи. ',
  'Уединенный дом, В сельской тиши… Даже дятел, В эту дверь не стучит!',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//Функция, создающая один объект объявления
const createOneOffer = (index) => ({
  author: {
    avatar: `img/avatars/user0${index + 1}.png`,
  },
  offer: {
    title: 'Заголовок',
    address: '',
    price: getRandomPositiveInteger(MIN_ADVERT_PRICE, MAX_ADVERT_PRICE),
    type: ADVERT_TYPES[getRandomPositiveInteger(0, ADVERT_TYPES.length - 1)],
    rooms: getRandomPositiveInteger(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
    guests: getRandomPositiveInteger(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
    checkin: CHECK_IN_AND_OUT_TIME[getRandomPositiveInteger(0, CHECK_IN_AND_OUT_TIME.length - 1)],
    checkout: CHECK_IN_AND_OUT_TIME[getRandomPositiveInteger(0, CHECK_IN_AND_OUT_TIME.length - 1)],
    features: FEATURES.slice(getRandomPositiveInteger(0, FEATURES.length - 1)),
    description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
    photos: PHOTOS.slice(getRandomPositiveInteger(0, PHOTOS.length - 1)),
  },
  location: {
    lat: getRandomPositiveFloat(MIN_LAT_VALUE, MAX_LAT_VALUE, 5),
    lng: getRandomPositiveFloat(MIN_LNG_VALUE, MAX_LNG_VALUE, 5),
  },
});

//Функиця, создающая массив похожих объявлений
const createAdverts = (advertsCount) => {
  const array = [];
  for (let index = 0; index < advertsCount; index++) {
    array.push(createOneOffer(index));
  }
  return array;
};

//Массив похожих объявлений
const adverts = createAdverts(ADVERT_COUNT);

console.log(adverts);
