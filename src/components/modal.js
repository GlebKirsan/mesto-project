import {
    addCardButton, avatarEditButton, closePopupButtons,
    editProfileButton,
    newProfileDescriptionElement,
    newProfileNameElement, popupAddCard, popupEditAvatar,
    popupEditProfile
} from "./elements";
import {addCard, editAvatar, editProfileInfo, userInfo} from "../index";

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

editProfileButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    newProfileNameElement.value = userData.name;
    newProfileDescriptionElement.value = userData.about;

    openPopup(popupEditProfile);
});
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

closePopupButtons.forEach(button => button.addEventListener('click', event => {
    closePopup(event.target.closest('.popup'));
}));
popupEditProfile.querySelector('.popup__edit-area').addEventListener('submit', event => editProfileInfo(event));

popupAddCard.querySelector('.popup__edit-area').addEventListener('submit', event => addCard(event));
avatarEditButton.addEventListener('click', () => openPopup(popupEditAvatar));

popupEditAvatar.querySelector('.popup__edit-area').addEventListener('submit', event => editAvatar(event));

export {openPopup, closePopup};