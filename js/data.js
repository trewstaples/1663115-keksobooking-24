const HEADINGS = [
  'Ты не можешь поменять то, чем само пространство хочет быть',
  'Уважая историю, вы все равно должны привнести свой собственный опыт в ваш дом',
  'Серьезно — это слово, которое необходимо избегать, когда речь заходит о декоре',
  'Моя идея комфорта — это хорошая лампа для чтения',
  'Великий дизайн начинается с еще более великой истории',
];

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

const ADVERT_COUNT = 10;

const Price = {
  MIN: 0,
  MAX: 10000,
};

const Rooms = {
  MIN: 1,
  MAX: 3,
};

const Guests = {
  MIN: 1,
  MAX: 3,
};

const Lat = {
  MIN: 35.65,
  MAX: 35.7,
  decimalCount: 5,
};

const Lng = {
  MIN: 139.7,
  MAX: 139.8,
  decimalCount: 5,
};

const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

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

const getRandomElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getAuthor = (index) => {
  index = index + 1;
  return { avatar: `img/avatars/user${index <= 9 ? `0${index}` : index}.png,` };
};

const getAdvert = () => ({
  title: getRandomElement(HEADINGS),
  address: `${getRandomPositiveFloat(Lat.MIN, Lat.MAX, Lat.decimalCount)}, ${getRandomPositiveFloat(Lng.MIN, Lng.MAX, Lng.decimalCount)}`,
  price: getRandomPositiveInteger(Price.MIN, Price.MAX),
  type: getRandomElement(ADVERT_TYPES),
  rooms: getRandomPositiveInteger(Rooms.MIN, Rooms.MAX),
  guests: getRandomPositiveInteger(Guests.MIN, Guests.MAX),
  checkin: getRandomElement(CHECK_IN_AND_OUT_TIME),
  checkout: getRandomElement(CHECK_IN_AND_OUT_TIME),
  features: FEATURES.slice(getRandomPositiveInteger(0, FEATURES.length - 1)),
  description: getRandomElement(DESCRIPTIONS),
  photos: PHOTOS.slice(getRandomPositiveInteger(0, PHOTOS.length - 1)),
});

const getLocation = () => ({
  lat: getRandomPositiveFloat(Lat.MIN, Lat.MAX, Lat.decimalCount),
  lng: getRandomPositiveFloat(Lng.MIN, Lng.MAX, Lng.decimalCount),
});

const createOneAdvert = (index) => ({
  author: getAuthor(index),
  offer: getAdvert(),
  location: getLocation(),
});

const createAdvertsList = (advertsCount) => {
  const array = [];
  for (let index = 0; index < advertsCount; index++) {
    array.push(createOneAdvert(index));
  }
  return array;
};

// const adverts = createAdvertsList(ADVERT_COUNT);

// export { adverts };
