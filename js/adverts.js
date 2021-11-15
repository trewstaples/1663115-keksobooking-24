const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');

const fillTitle = (markupElement, attribute, data) => {
  if (data) {
    markupElement.querySelector(attribute).textContent = data;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillAddress = (markupElement, attribute, data) => {
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

const fillPopupFeatures = (markupElement, attribute, features) => {
  if (features) {
    const featuresList = markupElement.querySelector(attribute);
    const featureItem = featuresList.querySelector('.popup__feature');
    const featuresFragment = document.createDocumentFragment();

    features.forEach((feature) => {
      const popupFeature = featureItem.cloneNode(true);
      popupFeature.classList.add(`popup__feature--${feature}`);
      featuresFragment.appendChild(popupFeature);
    });

    featuresList.innerHTML = '';
    featuresList.appendChild(featuresFragment);
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
    markupElement.querySelector(attribute).src = data;
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const fillPopupPhotos = (markupElement, attribute, photos) => {
  if (photos) {
    const photosList = markupElement.querySelector(attribute);
    const photoFragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      const popupPhoto = photosList.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = photo;
      photoFragment.appendChild(popupPhoto);
    });

    photosList.innerHTML = '';
    photosList.appendChild(photoFragment);
  } else {
    markupElement.querySelector(attribute).remove();
  }
};

const createAdvert = (advert) => {
  const { author, offer } = advert;
  const newAdvert = advertsTemplate.cloneNode(true);

  fillTitle(newAdvert, '.popup__title', offer.title);
  fillAddress(newAdvert, '.popup__text--address', offer.address);
  fillPrice(newAdvert, '.popup__text--price', offer.price);
  fillType(newAdvert, '.popup__type', offer.type, getOfferType(offer.type));
  fillTextCapacity(newAdvert, '.popup__text--capacity', offer.rooms, offer.guests);
  fillPopupTextTime(newAdvert, '.popup__text--time', offer.checkin, offer.checkout);
  fillPopupFeatures(newAdvert, '.popup__features', offer.features);
  fillPopupDescription(newAdvert, '.popup__description', offer.description);
  fillPopupAvatar(newAdvert, '.popup__avatar', author.avatar);
  fillPopupPhotos(newAdvert, '.popup__photos', offer.photos);

  return newAdvert;
};

export { createAdvert };
