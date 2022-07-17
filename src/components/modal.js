import {assignId, createCard, renderCard} from "./card";
import {disableButton} from "./validation";
import {renderLoading} from "./utils";
import {updateClientInfo, createCard as createCardRequest, editAvatar} from "./api";

const popupEditProfile = document.querySelector('.popup_edit-profile');
const newProfileNameElement = popupEditProfile.querySelector('.popup__input_data_name');
const newProfileDescriptionElement = popupEditProfile.querySelector('.popup__input_data_description');
const editProfileSubmitButton = popupEditProfile.querySelector('.popup__submit-button');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAvatar = document.querySelector('.profile__avatar-image');
const profileDescription = profileInfo.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_add-card');
const newCardNameElement = popupAddCard.querySelector('.popup__input_data_name');
const newCardLinkElement = popupAddCard.querySelector('.popup__input_data_link');
const addCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');

const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const newAvatarUrlElement = popupEditAvatar.querySelector('.popup__input');
const editAvatarSubmitButton = popupEditAvatar.querySelector('.popup__submit-button');

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
    renderLoading(true, editProfileSubmitButton);
    updateClientInfo(newProfileNameElement.value, newProfileDescriptionElement.value)
        .then(() => {
            profileName.textContent = newProfileNameElement.value;
            profileDescription.textContent = newProfileDescriptionElement.value;
            closePopup(event.target.closest('.popup'));
        })
        .finally(() => renderLoading(false, editProfileSubmitButton));
});

popupAddCard.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();
    renderLoading(true, addCardSubmitButton);
    let cardId;
    createCardRequest(newCardNameElement.value, newCardLinkElement.value)
        .then(card => {
            cardId = card._id;
            return createCard(card.name, card.link)
        })
        .then(cardElement => assignId(cardElement, cardId))
        .then(renderCard)
        .then(() => {
            closePopup(event.target.closest('.popup'));
            event.target.reset();
            disableButton(addCardSubmitButton, 'popup__submit-button_inactive');
        })
        .finally(() => renderLoading(false, addCardSubmitButton));
});

const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
avatarEditButton.addEventListener('click', () => openPopup(popupEditAvatar));

popupEditAvatar.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();
    renderLoading(true, editAvatarSubmitButton);
    editAvatar(newAvatarUrlElement.value)
        .then(() => {
            profileAvatar.src = newAvatarUrlElement.value;
            closePopup(event.target.closest('.popup'));
            event.target.reset();
            disableButton(avatarEditButton, 'popup__submit-button_inactive');
        })
        .finally(() => renderLoading(false, editAvatarSubmitButton));
})

export {openPopup, closePopup, updateProfileInfo};