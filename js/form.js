const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('fieldset, select.map__filter');

const BorderColor = {
  DEFAULT: 'rgb(217, 217, 211)',
  ERROR: 'red',
};

const TitleLength = {
  MIN: 30,
  MAX: 50,
};

const setDisabledState = () => {
  disabledFields.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

const togglePageState = () => {
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');

  setDisabledState();
};

togglePageState();

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestNumber = capacity.querySelectorAll('option');

const numberOfRooms = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    const isDisabled = numberOfRooms[roomValue].indexOf(guest.value) === -1;

    guest.selected = numberOfRooms[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomNumberChange);

const housePrice = document.querySelector('#price');
const houseTitle = document.querySelector('#title');

const onAdvertTitleInput = () => {
  const titleLength = houseTitle.value.length;

  if (titleLength === 0) {
    houseTitle.style.borderColor = BorderColor.ERROR;
    houseTitle.setCustomValidity('Это обязательное поле!');
  } else if (titleLength < TitleLength.MIN) {
    houseTitle.style.borderColor = BorderColor.ERROR;
    houseTitle.setCustomValidity(`Минимальная длина символов ${houseTitle.minLength}.
    Осталось ${houseTitle.minLength - titleLength}.`);
  } else if (titleLength > TitleLength.MAX) {
    houseTitle.style.borderColor = BorderColor.ERROR;
    houseTitle.setCustomValidity(`Длина не должна быть больше ${houseTitle.maxLength}`);
  } else {
    houseTitle.setCustomValidity('');
    houseTitle.style.borderColor = BorderColor.DEFAULT;
  }
  houseTitle.reportValidity();
};

houseTitle.addEventListener('input', onAdvertTitleInput);

const onAdvertPriceInput = () => {
  let priceValue = 0;
  priceValue = housePrice.value;

  if (priceValue === 0) {
    housePrice.style.borderColor = BorderColor.ERROR;
    housePrice.setCustomValidity('Это обязательное поле)))))');
  } else if (priceValue < Number(housePrice.min)) {
    housePrice.style.borderColor = BorderColor.ERROR;
    housePrice.setCustomValidity(`Минимальная цена ${housePrice.min}`);
  } else if (priceValue > Number(housePrice.max)) {
    housePrice.style.borderColor = BorderColor.ERROR;
    housePrice.setCustomValidity(`Цена не должна быть больше${housePrice.max}`);
  } else {
    housePrice.setCustomValidity('');
    housePrice.style.borderColor = BorderColor.DEFAULT;
  }
  housePrice.reportValidity();
};

housePrice.addEventListener('input', onAdvertPriceInput);

const houseType = document.querySelector('#type');
const typeOfHouse = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const validatePrice = () => {
  const typeValue = houseType.value;
  const minPrice = typeOfHouse[typeValue];

  housePrice.min = minPrice;
  housePrice.placeholder = minPrice;
};

const onHouseTypeChange = () => {
  validatePrice();
};

houseType.addEventListener('change', onHouseTypeChange);

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const timeForm = document.querySelector('.ad-form__element--time');

timeForm.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
});

export { togglePageState, adForm, mapFilters };
