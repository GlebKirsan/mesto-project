import {createCard, renderCard} from "./card";
import {disableButton} from "./validation";
import {updateClientInfo} from "./api";

const popupEditProfile = document.querySelector('.popup_edit-profile');
const newProfileNameElement = popupEditProfile.querySelector('.popup__input_data_name');
const newProfileDescriptionElement = popupEditProfile.querySelector('.popup__input_data_description');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAvatar = document.querySelector('.profile__avatar');
const profileDescription = profileInfo.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_add-card');
const newCardNameElement = popupAddCard.querySelector('.popup__input_data_name');
const newCardLinkElement = popupAddCard.querySelector('.popup__input_data_link');
const addCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');

const closeByClickOutside = event => {
    const isClickOnImage = event.target.classList.contains('popup__figure-container');
    const isClickOnPopup = event.target.classList.contains('popup__container');
    if (!isClickOnPopup && !isClickOnImage) {
        closePopup(event.target);
    }
};

const closeByEscape = event => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const openPopup = popup => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeByClickOutside);
    document.addEventListener('keydown', closeByEscape);
};

const closePopup = popup => {
    popup.classList.remove('popup_opened')
    popup.removeEventListener('click', closeByClickOutside);
    document.removeEventListener('keydown', closeByEscape);
};

const updateProfileInfo = (avatarLink, name, about) => {
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileAvatar.src = avatarLink;
}

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

    updateClientInfo(newProfileNameElement.value, newProfileDescriptionElement.value)
        .then(() => {
            profileName.textContent = newProfileNameElement.value;
            profileDescription.textContent = newProfileDescriptionElement.value;
            closePopup(event.target.closest('.popup'));
        })
});

popupAddCard.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();
    const newCard = createCard(newCardNameElement.value, newCardLinkElement.value);
    renderCard(newCard);

    closePopup(event.target.closest('.popup'));
    event.target.reset();
    disableButton(addCardSubmitButton, 'popup__submit-button_inactive');
});

export {openPopup, closePopup, updateProfileInfo};