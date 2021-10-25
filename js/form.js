const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', true);
  }

  mapFilters.classList.add('map__filters--disabled');

  for (let j = 0; j < mapFilters.children.length; j++) {
    mapFilters.children[j].setAttribute('disabled', true);
  }
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');

  for (let k = 0; k < adForm.children.length; k++) {
    adForm.children[k].removeAttribute('disabled', true);
  }
  mapFilters.classList.remove('map__filters--disabled');

  for (let l = 0; l < mapFilters.children.length; l++) {
    mapFilters.children[l].removeAttribute('disabled', true);
  }
};

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.addEventListener('mousedown', (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

mapCanvas.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    activatePage();
  }
});
deactivatePage();
