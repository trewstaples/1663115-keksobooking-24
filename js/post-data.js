import { adForm, onHouseTitleInput, onHousePriceInput, houseTitle, housePrice, checkDefaultState } from './form.js';
import { request } from './request.js';
import { resetPage } from './map.js';

const successAlert = document.querySelector('#success').content.querySelector('.success');
const errorAlert = document.querySelector('#error').content.querySelector('.error');

const onAlertEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    successAlert.remove();
    errorAlert.remove();
  }
};

const onPageClick = () => {
  successAlert.remove();
  errorAlert.remove();
};

const showSuccessAlert = () => {
  document.body.append(successAlert);
};

const onUploadSuccess = () => {
  showSuccessAlert();
  resetPage();
};

const onUploadError = () => {
  document.body.append(errorAlert);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorAlert.remove();
  });
};

const onButtonSubmitClick = () => {
  onHouseTitleInput();
  onHousePriceInput();
};
const buttonSubmit = document.querySelector('.ad-form__submit');

buttonSubmit.addEventListener('click', () => {
  onButtonSubmitClick();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (checkDefaultState(houseTitle) && checkDefaultState(housePrice)) {
    request(onUploadSuccess, onUploadError, 'POST', new FormData(adForm));
    document.addEventListener('keydown', onAlertEscKeydown);
    document.addEventListener('click', onPageClick);
  }
});
