import { adForm, onHouseTitleInput, onHousePriceInput, houseTitle, housePrice, checkDefaultState } from './form.js';
import { request } from './request.js';
import { resetPage } from './map.js';

const Photo = {
  WIDTH: 70,
  HEIGHT: 70,
  ALT: 'Фотографии пользователя',
  FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
};

const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = Photo.FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = Photo.FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const photoPreview = document.querySelector('.ad-form-header__preview img').cloneNode(true);
    const photoContainer = document.querySelector('.ad-form__photo');
    photoContainer.appendChild(photoPreview);
    photoPreview.alt = Photo.ALT;
    photoPreview.width = Photo.WIDTH;
    photoPreview.height = Photo.HEIGHT;
    photoPreview.src = URL.createObjectURL(file);
  }
});

const successAlert = document.querySelector('#success').content.querySelector('.success');
const errorAlert = document.querySelector('#error').content.querySelector('.error');

const onAlertEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    successAlert.remove();
    errorAlert.remove();
    document.removeEventListener('keydown', onAlertEscKeydown);
  }
};

const onPageClick = () => {
  successAlert.remove();
  errorAlert.remove();
  document.removeEventListener('keydown', onAlertEscKeydown);
};

const showSuccessAlert = () => {
  document.body.append(successAlert);
};

const onUploadSuccess = () => {
  showSuccessAlert();
  resetPage();
  const success = document.querySelector('.overlay');

  document.addEventListener('keydown', onAlertEscKeydown);
  success.addEventListener('click', onPageClick);
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
  }
});
