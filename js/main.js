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
const ROOMS = {
  MIN: 1,
  MAX: 3,
};
const GUESTS = {
  MIN: 1,
  MAX: 3,
};

const LAT = {
  MIN: 35.65,
  MAX: 35.7,
  decimalCount: 5,
};

const LNG = {
  MIN: 139.7,
  MAX: 139.8,
  decimalCount: 5,
};

const PRICE = {
  MIN: 0,
  MAX: 10000,
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

//Функция для генерации случайного элемента
const getRandomElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция для создания аватара
const getAuthor = (index) => {
  index = index + 1;
  return { avatar: `img/avatars/user${index <= 9 ? `0${index}` : index}.png,` };
};

//Функция для создания предложения
const getAdvert = () => ({
  title: getRandomElement(HEADINGS),
  address: `${getRandomPositiveFloat(LAT.MIN, LAT.MAX, LAT.decimalCount)}, ${getRandomPositiveFloat(
    LNG.MIN,
    LNG.MAX,
    LNG.decimalCount
  )}`,
  price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX),
  type: getRandomElement(ADVERT_TYPES),
  rooms: getRandomPositiveInteger(ROOMS.MIN, ROOMS.MAX),
  guests: getRandomPositiveInteger(GUESTS.MIN, GUESTS.MAX),
  checkin: getRandomElement(CHECK_IN_AND_OUT_TIME),
  checkout: getRandomElement(CHECK_IN_AND_OUT_TIME),
  features: FEATURES.slice(getRandomPositiveInteger(0, FEATURES.length - 1)),
  description: getRandomElement(DESCRIPTIONS),
  photos: PHOTOS.slice(getRandomPositiveInteger(0, PHOTOS.length - 1)),
});

//Функция длдя создания локации
const getLocation = () => ({
  lat: getRandomPositiveFloat(LAT.MIN, LAT.MAX, LAT.decimalCount),
  lng: getRandomPositiveFloat(LNG.MIN, LNG.MAX, LNG.decimalCount),
});

//Функция, создающая один объект объявления
const createOneAdvert = (index) => ({
  author: getAuthor(index),
  offer: getAdvert(),
  location: getLocation(),
});

//Функиця, создающая массив похожих объявлений
const createAdverts = (advertsCount) => {
  const array = [];
  for (let index = 0; index < advertsCount; index++) {
    array.push(createOneAdvert(index));
  }
  return array;
};

//Массив похожих объявлений
const adverts = createAdverts(ADVERT_COUNT);

console.log(adverts);
console.log(getRandomElement(HEADINGS));
//Вопросы
//Вопрос 1 - Минимальное количество комнат 1, будет ли это магическим значением? Тоже самое с кроличеством гостей - 1, и минимальной ценной 0;
//Вопрос 2 -при slice мы обязательно передаем первым 0? Тогда получается у нас всегда в любом предложении будет первый элемент wi-fi, а если просто передать random, то будут разные варианты
