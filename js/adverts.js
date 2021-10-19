import { adverts } from './data.js';

//Найти шаблон для заполнения данных и создать фрагмент
const advertsTemplate = document.querySelector('#card').content.querySelector('.popup');
advertsTemplate;
const advertsFragment = document.createDocumentFragment();
advertsFragment;

//Найти блок карты для вставки сгенерированных данных
const advertsMap = document.querySelector('#map-canvas');
advertsMap;

//Вставить данные из массива в шаблон.
adverts.forEach((advert) => {
  const newAdvert = advertsTemplate.cloneNode(true);

  newAdvert.querySelector('.popup__title').textContent = advert.offer.title;
  newAdvert.querySelector('.popup__text--address').textContent = advert.offer.address;
  newAdvert.querySelector('.popup__text--price').textContent = `${advert.price} ₽/ночь`;
  newAdvert.querySelector('.popup__type').textContent = advert.offer.type; //Как сделать деление на типы?
  newAdvert.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  newAdvert.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд после ${advert.offer.checkout}`;
  newAdvert.querySelector('.popup__features').textContent = advert.offer.features;
  newAdvert.querySelector('.popup__description').textContent = advert.offer.description;
  newAdvert.querySelector('.popup__photos').src = advert.offer.photos;
  newAdvert.querySelector('.popup__avatar').src = advert.author.avatar;

  advertsFragment.appendChild(newAdvert);
});
advertsMap.appendChild(advertsFragment);
