const BorderColor = {
  DEFAULT: 'rgb(217, 217, 211)',
  ERROR: 'red',
};

const BorderWidth = {
  DEFAULT: '1px',
  ERROR: '5px',
};

const TitleLength = {
  MIN: 30,
  MAX: 50,
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('fieldset');
const disabledFilters = document.querySelectorAll('select.map__filter, fieldset.map__features');

const setDisabledState = (elements) => {
  elements.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

const toggleFormState = () => {
  adForm.classList.toggle('ad-form--disabled');
  setDisabledState(disabledFields);
};

const toggleFiltersState = () => {
  mapFilters.classList.toggle('map__filters--disabled');
  setDisabledState(disabledFilters);
};

toggleFormState();
toggleFiltersState();

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

const houseTitle = document.querySelector('#title');
const housePrice = document.querySelector('#price');

const setErrorState = (element) => {
  element.style.borderColor = BorderColor.ERROR;
  element.style.borderWidth = BorderWidth.ERROR;
};

const setDefaultState = (element) => {
  element.style.borderColor = BorderColor.DEFAULT;
  element.style.borderWidth = BorderWidth.DEFAULT;
};

const checkDefaultState = (element) => {
  if (element.style.borderColor === BorderColor.DEFAULT) {
    return true;
  }
};

const onHouseTitleInput = () => {
  const titleLength = houseTitle.value.length;

  if (titleLength === 0) {
    setErrorState(houseTitle);
    houseTitle.setCustomValidity('Это обязательное поле!');
  } else if (titleLength < TitleLength.MIN) {
    setErrorState(houseTitle);
    houseTitle.setCustomValidity(`Минимальная длина символов ${houseTitle.minLength}.
    Осталось ${houseTitle.minLength - titleLength}.`);
  } else if (titleLength > TitleLength.MAX) {
    setErrorState(houseTitle);
    houseTitle.setCustomValidity(`Длина не должна быть больше ${houseTitle.maxLength}`);
  } else {
    houseTitle.setCustomValidity('');
    setDefaultState(houseTitle);
  }
  houseTitle.reportValidity();
};

houseTitle.addEventListener('input', onHouseTitleInput);

const onHousePriceInput = () => {
  let priceValue = 0;
  priceValue = housePrice.value;

  if (priceValue === 0) {
    setErrorState(housePrice);
    housePrice.setCustomValidity('Это обязательное поле)))))');
  } else if (priceValue < Number(housePrice.min)) {
    setErrorState(housePrice);
    housePrice.setCustomValidity(`Минимальная цена ${housePrice.min}`);
  } else if (priceValue > Number(housePrice.max)) {
    setErrorState(housePrice);
    housePrice.setCustomValidity(`Цена не должна быть больше${housePrice.max}`);
  } else {
    housePrice.setCustomValidity('');
    setDefaultState(housePrice);
  }
  housePrice.reportValidity();
};

housePrice.addEventListener('input', onHousePriceInput);

const houseType = document.querySelector('#type');

const minHousePrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const validatePrice = () => {
  const typeValue = houseType.value;
  const minPrice = minHousePrice[typeValue];

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

export { toggleFormState, toggleFiltersState, adForm, mapFilters, onHouseTitleInput, onHousePriceInput, houseTitle, housePrice, minHousePrice, checkDefaultState };
