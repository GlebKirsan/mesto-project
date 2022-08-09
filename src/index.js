import './pages/index.css';

import Api from "./components/Api";
import Section from './components/Section';
import {
    checkImageAvailable,
    disableButton,
    parseDateInCard,
    renderLoading,
    sortCardsByDateDescending
} from "./components/utils";
import Card, {
    assignId,
    disableDeleteIfNotOwner,
    pressLikeIfClientLiked,
    setLikeCounter
} from "./components/Card";
import {
    addCardSubmitButton,
    apiOptions,
    avatarEditButton,
    cardTemplate,
    editAvatarSubmitButton,
    editProfileSubmitButton,
    newAvatarUrlElement,
    newCardLinkElement,
    newCardNameElement,
    newProfileDescriptionElement,
    newProfileNameElement,
    popupImage,
    popupImageCaption,
    popupImageView,
    profileAvatar,
    profileDescription,
    profileName,
    cardsContainer
} from "./components/elements";
import { closePopup, openPopup } from "./components/modal";
import FormValidator from "./components/FormValidator";
import UserInfo from "./components/UserInfo"

let _id;
const api = new Api(apiOptions);
let cardList;
export let userInfo = new UserInfo({
    nameSelector: profileName,
    aboutSelector: profileDescription,
    avatarSelector: profileAvatar});

const openImageAction = (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openPopup(popupImageView);
};

export const editProfileInfo = event => {
    event.preventDefault();
    renderLoading(true, editProfileSubmitButton);
    api.updateClientInfo.call(api, newProfileNameElement.value, newProfileDescriptionElement.value)
        .then(() => {
            userInfo.setUserInfo({
                name: newProfileNameElement.value, 
                about: newProfileDescriptionElement.value
            })
            closePopup(event.target.closest('.popup'));
        })
        .catch(() => 'Ошибка обновления информации о профиле')
        .finally(() => renderLoading(false, editProfileSubmitButton));
};

export const editAvatar = event => {
    event.preventDefault();
    renderLoading(true, editAvatarSubmitButton);
    api.editAvatar.call(api, newAvatarUrlElement.value)
        .then(() => {
            userInfo.setUserInfo({
                avatarLink: newAvatarUrlElement.value
            })
            closePopup(event.target.closest('.popup'));
            event.target.reset();
            disableButton(avatarEditButton, 'popup__submit-button_inactive');
        })
        .finally(() => renderLoading(false, editAvatarSubmitButton));
};

export const addCard = event => {
    event.preventDefault();
    renderLoading(true, addCardSubmitButton);
    api.createCard.call(api, newCardNameElement.value, newCardLinkElement.value)
        .then(card => createCard(card, _id))
        .then(card => cardList.addItem(card))
        .then(() => {
            closePopup(event.target.closest('.popup'));
            event.target.reset();
            disableButton(addCardSubmitButton, 'popup__submit-button_inactive');
        })
        .catch(() => 'Ошибка добавления карточки')
        .finally(() => renderLoading(false, addCardSubmitButton));
};

Promise.all([api.getClientInfo(), api.getCards()])
    .then(([clientInfo, cards]) => {
        _id = clientInfo._id;
        userInfo.setUserInfo({
            avatarLink: clientInfo.avatar,
            name: clientInfo.name,
            about: clientInfo.about
        });

        cards = cards.map(parseDateInCard).sort(sortCardsByDateDescending);
        cardList = new Section({
            items: cards,
            renderer: (card) => {
                createCard(card, _id)
                    .then((cardElement) => cardList.addItem(cardElement, false))
                    .catch(() => console.error(`Изображение ${card.name} по ссылке ${card.link} не доступно.`));
            }
        }, cardsContainer);
        cardList.renderItems();
    });

const createCard = (card, _id) => {
    return checkImageAvailable(card.link)
        .then(() => {
            const cardObj = new Card({
                data: card,
                handleCardClick: () => openImageAction(card.name, card.link),
                handleCardLike: api.likeCard.bind(api),
                handleCardUnlike: api.unlikeCard.bind(api),
                handleCardDelete: api.deleteCard.bind(api)
            }, cardTemplate);
            return cardObj.generate();
        })
        .then(cardElement => assignId(cardElement, card._id))
        .then(cardElement => setLikeCounter(cardElement, card.likes.length))
        .then(cardElement => pressLikeIfClientLiked(cardElement, card.likes, _id))
        .then(cardElement => {
            const isCardOwner = card.owner._id === _id;
            return disableDeleteIfNotOwner(cardElement, isCardOwner);
        })
}

document.querySelectorAll('.popup__edit-area').forEach(popupForm => {
    new FormValidator({
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit-button',
        inactiveButtonClass: 'popup__submit-button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    },
        popupForm).enableValidation();
});