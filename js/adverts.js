const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');

const fillTitle = (markupElement, attribute, data) => {
  if (data) {
    markupElement.querySelector(attribute).textContent = data;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillAdress = (markupElement, attribute, data) => {
  if (data) {
    markupElement.querySelector(attribute).textContent = data;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillPrice = (markupElement, attribute, data) => {
  if (data) {
    markupElement.querySelector(attribute).textContent = `${data} ₽/ночь`;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillType = (markupElement, attribute, data, type) => {
  if (data) {
    markupElement.querySelector(attribute).textContent = type;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getOfferType = (type) => offerTypes[type];

const fillTextCapacity = (markupElement, attribute, roomsData, guestsData) => {
  if (roomsData || guestsData) {
    markupElement.querySelector(attribute).textContent = `${roomsData} комнаты для ${guestsData} гостей`;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillPopupTextTime = (markupElement, attribute, checkinData, checkoutData) => {
  if (checkinData || checkoutData) {
    markupElement.querySelector(attribute).textContent = `Заезд после ${checkinData}, выезд после ${checkoutData}`;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillPopupFeatures = (markupElement, attribute, data) => {
  if (data) {
    markupElement.querySelector(attribute).textContent = data;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillPopupDescription = (markupElement, attribute, data) => {
  if (data) {
    markupElement.querySelector(attribute).textContent = data;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillPopupAvatar = (markupElement, attribute, data) => {
  if (data) {
    markupElement.querySelector(attribute).remove();
  } else {
    markupElement.querySelector(attribute).src = data;
  }
};

const createAdvert = (advert) => {
  const { author, offer } = advert;
  const newAdvert = advertsTemplate.cloneNode(true);

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
    popupPhoto.src = photo;
    photoFragment.appendChild(popupPhoto);
  });

  photosList.innerHTML = '';
  photosList.appendChild(photoFragment);
  return newAdvert;
};

export { createAdvert };
