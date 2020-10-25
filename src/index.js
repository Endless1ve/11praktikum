'use strict'
import "./style.css";
import Api from './js/Api.js';
import Card from './js/Card.js';
import CardList from './js/CardList.js';
import ClearError from './js/ClearError.js';
import DefaultValueForm from './js/DefaultValueForm.js';
import FormValidator from './js/FormValidator.js';
import Popup from './js/Popup.js';
import UserInfo from './js/UserInfo.js';
const placeList = document.querySelector('.places-list');
const addCardButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const infoName = document.querySelector('.user-info__name');
const infoAbout = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const avatarPopup = document.querySelector('.popup_avatar-card');
const avatarButton = document.querySelector('.popup__button_avatar-card');
const avatarForm = document.querySelector('.popup__form_avatar-card');
const avatarLink = document.querySelector('.popup__input_type_link-url_avatar-card');
//
const addCard = document.querySelector('.popup_add-card');
const inputName = document.querySelector('.popup__input_type_name_add-card');
const inputLink = document.querySelector('.popup__input_type_link-url_add-card');
const addButton = document.querySelector('.popup__button_add-card');
const addCardForm = document.querySelector('.popup__form_add-card');
// 1
const editUser = document.querySelector('.popup_edit-user-info');
const editName = document.querySelector('.popup__input_type_name_edit');
const editAbout = document.querySelector('.popup__input_type_about_edit');
//
const imagePop = document.querySelector('.popup_opening-image');
//
const form = document.querySelector('.popup__form_edit-user-info');
//
const submitButton = document.querySelector('.popup__button_edit-user-info');

const editForm = document.forms.editProfile;
const newForm = document.forms.addCard;
// определяет дом элемент для внедрения карточек
const bootCard = new CardList(placeList);
// открывает нужные окна
const userPop = new Popup(editUser);
const addPop = new Popup(addCard);
const imageShow = new Popup(imagePop);
const avatarShow = new Popup(avatarPopup);
// очищает ошибки в формах
const errorClearAdd = new ClearError(addCardForm.querySelectorAll('.popup__valid'));
const errorClearEdit = new ClearError(form.querySelectorAll('.popup__valid'));
// валидация форм
const validateStringError = {
    validationAbsenceRU: 'Обязательное поле',
    validationLenghtRU: 'Должно быть от 2 до 30 символов',
    validationLinkRu: 'Здесь должна быть ссылка'
};
const validityFormAdd = new FormValidator(newForm, addButton, validateStringError);
const validityFormEdit = new FormValidator(editForm, submitButton, validateStringError);
const validityFormAvatar = new FormValidator(avatarForm, avatarButton, validateStringError);
//
const baseURL = 'http://nomoreparties.co/cohort10';
const _token = 'fb1a6f61-8bda-4b8c-a8a2-9caef6590fe7';
const api = new Api(baseURL, _token);
const initialCards = api.takeCards();
//
const userInfo = new UserInfo(api.userInfo(), infoName, infoAbout, userAvatar);
const defaultEdit = new DefaultValueForm(editName, editAbout);
//

function renderCard(initialCards) {
    const elementCard = [];
    for (let elem of initialCards) {
        const createBaseCard = new Card(elem, api);
        elementCard.push(createBaseCard);
    }
    bootCard.render(elementCard);
}
initialCards.then(res => renderCard(res))
    .catch(err => console.log(err));

// Открывает попап с добавлением карточки

const clearedForm = () => {
    inputName.value = '';
    inputLink.value = '';
};

function addCardPop() {

    errorClearAdd.clear();
    addPop.open();
    validityFormAdd.setSubmitButtonState(false);
    clearedForm();
}

function inputCard(event) {
    event.preventDefault();
    addButton.textContent = 'Загрузка...';
    api.addNewCard(inputName.value, inputLink.value)
        .then((res) => {
            const newCard = new Card(res, api);
            bootCard.addCard(newCard);
            clearedForm();
            addButton.textContent = '+';
            addPop.close();
        })
        .catch(err => console.log('С ссылкой что-то не так\n' + err));
}

// Открывает изображение карточки
function openigImageCard(event) {
    if (event.target.classList.contains('place-card__image')) {
        imageShow.open();
        const urlImage = event.target.style.backgroundImage.slice(5, -2);
        document.querySelector('.popup__window-image').src = urlImage;
    }
}

// Эвенты внутри карточек

function editEvent() {
    defaultEdit.defaultValue();
    userPop.open();
    validityFormEdit.setSubmitButtonState(true);
    errorClearEdit.clear();
}

function submitEditUser(event) {
    event.preventDefault();

    submitButton.textContent = 'Загрузка...';
    api.newInfoUser(editName.value, editAbout.value)
        .then((res) => {
            if (res.ok) {
                userInfo.updateUserInfo(editName.value, editAbout.value);
                submitButton.textContent = 'Сохранить';
                userPop.close();
            }
        })
        .catch(err => console.log('Ответа нет\n', err));
}

function openAvatarPopup(event) {
    avatarShow.open();
    avatarLink.nextElementSibling.textContent = '';
    avatarLink.value = '';
}

function updateAvatar(event) {
    event.preventDefault();

    avatarButton.textContent = 'Загрузка...';
    api.updateAvatar(avatarLink.value)
        .then(res => {
            if (res) {
                userInfo.avatarUser(avatarLink.value);
                avatarButton.textContent = 'Сохранить';
                avatarShow.close();
            }
        })
        .catch(err => console.log(`С изображение что-то не так\n${err}`));
}

userAvatar.addEventListener('click', openAvatarPopup);
//
placeList.addEventListener('click', openigImageCard);
//
editButton.addEventListener('click', editEvent);
addCardButton.addEventListener('click', addCardPop);
//
avatarForm.addEventListener('submit', updateAvatar);
newForm.addEventListener('submit', inputCard);
editForm.addEventListener('submit', submitEditUser);
//
validityFormAvatar.setEventListeners();
validityFormAdd.setEventListeners();
validityFormEdit.setEventListeners();
