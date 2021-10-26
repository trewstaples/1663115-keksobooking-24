const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

const enableElements = (elements) => {
  for (let j = 0; j < elements.length; j++) {
    elements[j].disabled = false;
  }
};

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  disableElements(adForm.children);
  disableElements(mapFilters.children);
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  enableElements(adForm.children);
  enableElements(mapFilters.children);
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
