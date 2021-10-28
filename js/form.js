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

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.addEventListener('mousedown', (evt) => {
  if (evt.button === 0) {
    togglePageState();
  }
});

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
    //Проверяем, можно ли разместить текущее количество гостей в комнатах:
    const isDisabled = numberOfRooms[roomValue].indexOf(guest.value) === -1;
    //1.numberOfRooms[roomValue] - в объекте с комнатами выбираем кол-во комнат
    //2.indexOf - возвращает "индекс элемента в массиве" если он есть и "-1", если его нет
    //3.Если столько гостей можно разместить в комнате(элемент в массиве есть)- true, если нет - false. Записываем результат в isDisabled.
    guest.selected = numberOfRooms[roomValue][0] === guest.value;
    //Если значения количества гостей равно первому элементу массива - добавляем ему атрибут selected
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
