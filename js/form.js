const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', true);
  }
  mapFilters.classList.add('map__filters--disabled');

  for (let j = 0; j < mapFilters.children.length; j++) {
    mapFilters.children[j].setAttribute('disabled', true);
  }
};

const activatePage = (condition) => {
  condition ? '' : deactivateForm();
};

activatePage(1);
