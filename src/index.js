import './pages/index.css';

import Api from "./components/Api";
import Section from './components/Section';
import {
    checkImageAvailable,
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
    apiOptions,
    cardTemplate,
    profileAvatar,
    profileDescription,
    profileName,
    cardsContainer,
    popupImageSelector,
    popupProfileInfoSelector,
    popupEditAvatarSelector,
    popupAddCardSelector,
    editProfileButton, newProfileNameElement, newProfileDescriptionElement, addCardButton, avatarEditButton
} from "./components/constants";
import FormValidator from "./components/FormValidator";
import UserInfo from "./components/UserInfo"
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";

let _id;
const api = new Api(apiOptions);
let cardList;
export let userInfo = new UserInfo({
    nameSelector: profileName,
    aboutSelector: profileDescription,
    avatarSelector: profileAvatar});

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const editProfileInfo = (event, button, inputValues) => {
    renderLoading(true, button);
    const [name, description] = inputValues;
    api.updateClientInfo.call(api, name, description)
        .then(response =>
            userInfo.setUserInfo({
                name: response.name,
                about: response.about
            }))
        .catch(() => 'Ошибка обновления информации о профиле')
        .finally(() => renderLoading(false, button));
};
export const profileInfoPopup = new PopupWithForm(popupProfileInfoSelector, editProfileInfo);
profileInfoPopup.setEventListeners();

const editAvatar = (event, button, inputValues) => {
    renderLoading(true, button);
    const [newAvatarUrl] = inputValues;
    api.editAvatar.call(api, newAvatarUrl)
        .then(response => {
            userInfo.setUserInfo({
                avatarLink: response.avatar
            })
        })
        .finally(() => renderLoading(false, button));
};
export const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, editAvatar);
editAvatarPopup.setEventListeners();

const addCard = (event, button, inputValues) => {
    renderLoading(true, button);
    const [cardName, cardImageLink] = inputValues;
    api.createCard.call(api, cardName, cardImageLink)
        .then(card => createCard(card, _id))
        .then(card => cardList.addItem(card))
        .catch(() => 'Ошибка добавления карточки')
        .finally(() => renderLoading(false, button));
};
export const addCardPopup = new PopupWithForm(popupAddCardSelector, addCard);
addCardPopup.setEventListeners();

editProfileButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    newProfileNameElement.value = userData.name;
    newProfileDescriptionElement.value = userData.about;

    profileInfoPopup.open();
});
addCardButton.addEventListener('click', () => addCardPopup.open());
avatarEditButton.addEventListener('click', () => editAvatarPopup.open());

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
                handleCardClick: () => imagePopup.open(card.name, card.link),
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