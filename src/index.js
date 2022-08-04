import './pages/index.css';

import {disableButton, enableValidation} from "./components/validation";

import Api from "./components/api";
import {checkImageAvailable, parseDateInCard, renderLoading, sortCardsByDateDescending} from "./components/utils";
import {
    Card,
    assignId,
    disableDeleteIfNotOwner,
    pressLikeIfClientLiked, 
    renderCard,
    setLikeCounter,
    renderCardOnFirstLoad,
    updateLikes
} from "./components/card";
import {
    addCardSubmitButton, avatarEditButton,
    editAvatarSubmitButton,
    editProfileSubmitButton,
    likeActiveClass,
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
    apiOptions,
    cardTemplate
} from "./components/elements";
import {closePopup, openPopup} from "./components/modal";

let _id;
const api = new Api(apiOptions);

const updateProfileInfo = (avatarLink, name, about) => {
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileAvatar.src = avatarLink;
}

const likeAction = (event, card) => {
    const cardId = card.querySelector('.card__id').textContent;
    const method = event.target.classList.contains(likeActiveClass)
        ? api.unlikeCard.bind(api)
        : api.likeCard.bind(api);
    method(cardId)
        .then(newLikesNumber => updateLikes(event, newLikesNumber, card))
        .catch(() => 'Ошибка при нажатии на лайк');
};

const deleteAction = (event, card) => {
    const cardId = card.querySelector('.card__id').textContent;
    api.deleteCard.call(api, cardId)
        .then(() => event.target.closest('.card').remove())
        .catch(() => console.error(`Ошибка удаления карточки ${cardId}`))
        .catch(() => 'Ошибка при удалении карточки');
};

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
            profileName.textContent = newProfileNameElement.value;
            profileDescription.textContent = newProfileDescriptionElement.value;
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
            profileAvatar.src = newAvatarUrlElement.value;
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
        .then(card => createCard(card, renderCard, _id))
        .then(() => {
            closePopup(event.target.closest('.popup'));
            event.target.reset();
            disableButton(addCardSubmitButton, 'popup__submit-button_inactive');
        })
        .catch('Ошибка добавления карточки')
        .finally(() => renderLoading(false, addCardSubmitButton));
};

Promise.all([api.getClientInfo(), api.getCards()])
    .then(([clientInfo, cards]) => {
        _id = clientInfo._id;
        updateProfileInfo(clientInfo.avatar, clientInfo.name, clientInfo.about);

        cards = cards.map(parseDateInCard).sort(sortCardsByDateDescending);
        cards.forEach(card => createCard(card, renderCardOnFirstLoad, _id));
    });

const createCard = (card, renderFunction, _id) => {
    return checkImageAvailable(card.link)
    .then(() => {
        const cardObj = new Card({
            data: card,
            handleCardClick: () => openImageAction(card.name, card.link),
            handleCardLike: api.likeCard.bind(api),
            handleCardUnlike: api.unlikeCard.bind(api),
            handleCardDelete: api.deleteCard.bind(api) }, cardTemplate);
        const cardElement = cardObj.generate();
        return cardElement;
    })
    .then(cardElement => assignId(cardElement, card._id))
    .then(cardElement => setLikeCounter(cardElement, card.likes.length))
    .then(cardElement => pressLikeIfClientLiked(cardElement, card.likes, _id))
    .then(cardElement => {
        const isCardOwner = card.owner._id === _id;
        return disableDeleteIfNotOwner(cardElement, isCardOwner);
    })
    .then(renderFunction)
    .catch(() => console.error(`Изображение ${card.name} по ссылке ${card.link} не доступно.`));
}

enableValidation({
    formSelector: '.popup__edit-area',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
});