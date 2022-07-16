import {createCard, renderCard} from "./card";

const popupEditProfile = document.querySelector('.popup_edit-profile');
const newProfileNameElement = popupEditProfile.querySelector('.popup__input_data_name');
const newProfileDescriptionElement = popupEditProfile.querySelector('.popup__input_data_description');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_add-card');
const newCardNameElement = popupAddCard.querySelector('.popup__input_data_name');
const newCardLinkElement = popupAddCard.querySelector('.popup__input_data_link');

const openPopup = popup => {
    popup.classList.add('popup_opened');
};

const closePopup = popup => {
    popup.classList.remove('popup_opened')
};

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    newProfileNameElement.value = profileName.textContent;
    newProfileDescriptionElement.value = profileDescription.textContent;

    openPopup(popupEditProfile);
});

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

const closePopupButtons = document.querySelectorAll('.popup__close-button');
closePopupButtons.forEach(button => button.addEventListener('click', event => {
    closePopup(event.target.closest('.popup'));
}));

popupEditProfile.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();

    profileName.textContent = newProfileNameElement.value;
    profileDescription.textContent = newProfileDescriptionElement.value;

    closePopup(event.target.closest('.popup'));
});

popupAddCard.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();
    const newCard = createCard(newCardNameElement.value, newCardLinkElement.value);
    renderCard(newCard);

    closePopup(event.target.closest('.popup'));
    newCardNameElement.value = '';
    newCardLinkElement.value = '';
});

export {openPopup, closePopup};