import { adForm } from './form.js';
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
  resetPage();
  showSuccessAlert();
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  request(onUploadSuccess, onUploadError, 'POST', formData);
});
