import { adverts } from './data.js';

//Найти блок, куда будут вставляться данные - OK
const advertsMap = document.querySelector('#map-canvas');
advertsMap;

//Создать фрагмент, куда будем складывать данные
const advertsFragment = document.createDocumentFragment();
advertsFragment;

//Найти шаблон для заполнения данными
const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');
advertsTemplate;

//Функция, добавляющая заголовок
const fillTitle = (markupElement, attribute, data) => {
  if (data === '' || data === null || data === undefined) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = data;
  }
};

//Функция, добавляющая адресс
const fillAdress = (markupElement, attribute, data) => {
  if (data === '' || data === undefined || data === null) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = data;
  }
};

//Функция, добавляющая цену
const fillPrice = (markupElement, attribute, data) => {
  if (data === '' || data === undefined || data === null) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = `${data} ₽/ночь`;
  }
};

//Функция, добавляющая тип
const fillType = (markupElement, attribute, data, type) => {
  if (data === '' || data === null || data === undefined) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = type;
  }
};

const getOfferType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const fillTextCapacity = (markupElement, attribute, roomsData, guestsData) => {
  if (roomsData === '' || roomsData === null || roomsData === undefined || guestsData === '' || guestsData === null || guestsData === undefined) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = `${roomsData} комнаты для ${guestsData} гостей`;
  }
};

const fillPopupTextTime = (markupElement, attribute, checkinData, checkoutData) => {
  if (checkinData === '' || checkinData === null || checkinData === undefined || checkoutData === '' || checkoutData === null || checkoutData === undefined) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = `Заезд после ${checkinData}, выезд после ${checkoutData}`;
  }
};

const fillPopupFeatures = (markupElement, attribute, data) => {
  if (data === '' || data === null || data === undefined) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = data;
  }
};

const fillPopupDescription = (markupElement, attribute, data) => {
  if (data === '' || data === null || data === undefined) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).textContent = data;
  }
};

const fillPopupAvatar = (markupElement, attribute, data) => {
  if (data === '' || data === null || data === undefined) {
    markupElement.querySelector(attribute).classList.add('hidden');
  } else {
    markupElement.querySelector(attribute).src = `img/avatars/user${data}.png`;
  }
};
//Вставить данные из массива в шаблон.
const createAdvert = (advert) => {
  const { author, offer } = advert;
  const newAdvert = advertsTemplate.cloneNode(true);

  for (let i = 0; i < 1; i++) {
    fillTitle(newAdvert, '.popup__title', offer.title);
    fillAdress(newAdvert, '.popup__text--address', offer.address);
    fillPrice(newAdvert, '.popup__text--price', offer.price);
    fillType(newAdvert, '.popup__type', offer.type, getOfferType(offer.type));
    fillTextCapacity(newAdvert, '.popup__text--capacity', offer.rooms, offer.guests);
    fillPopupTextTime(newAdvert, '.popup__text--time', offer.checkin, offer.checkout);
    fillPopupFeatures(newAdvert, '.popup__features', offer.features);
    fillPopupDescription(newAdvert, '.popup__description', offer.description);
    fillPopupAvatar(newAdvert, '.popup__avatar', author.avatar);

    const photosList = newAdvert.querySelector('.popup__photos');
    const photoFragment = document.createDocumentFragment();

    offer.photos.forEach((photo) => {
      const popupPhoto = photosList.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = photo.src;
      photoFragment.appendChild(popupPhoto);
    });

    photosList.innerHTML = '';
    photosList.appendChild(photoFragment);
    advertsFragment.appendChild(newAdvert);
  }
};
createAdvert(adverts[0]);
advertsMap.appendChild(advertsFragment);
