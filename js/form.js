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
