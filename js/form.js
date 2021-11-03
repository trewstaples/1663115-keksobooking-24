const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('fieldset, select.map__filter');

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

const houseType = document.querySelector('#type');
const housePrice = document.querySelector('#price');

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
