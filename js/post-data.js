import { adForm, isTitleValid, isPriceValid, onHouseTitleInput, onHousePriceInput } from './form.js';
import { request } from './request.js';
import { resetPage } from './map.js';

const exitEscKeyDown = (element) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      element.remove();
    }
  });
};

const exitPageClick = (element) => {
  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    element.remove();
  });
};

const successAlert = document.querySelector('#success').content.querySelector('.success');
const errorAlert = document.querySelector('#error').content.querySelector('.error');

const showSuccessAlert = () => {
  document.body.append(successAlert);

  exitEscKeyDown(successAlert);
  exitPageClick(successAlert);
};

const onUploadSuccess = () => {
  showSuccessAlert();
  resetPage();
};

const onUploadError = () => {
  document.body.append(errorAlert);

  exitEscKeyDown(errorAlert);
  exitPageClick(errorAlert);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorAlert.remove();
  });
};

const buttonSubmit = document.querySelector('.ad-form__submit');

buttonSubmit.addEventListener('click', (evt) => {
  evt.preventDefault();
  onHouseTitleInput();
  onHousePriceInput();
  if (isTitleValid && isPriceValid) {
    request(onUploadSuccess, onUploadError, 'POST', new FormData(adForm));
  }
});
