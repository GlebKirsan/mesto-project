import './pages/index.css';

import Api from "./components/Api";
import Section from './components/Section';
import {
    checkImageAvailable,
    parseDateInCard,
    renderLoading,
    sortCardsByDateDescending
} from "./components/utils";
import Card from "./components/Card";
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
    buttonOpenPopupProfileEdit,
    newProfileNameElement,
    newProfileDescriptionElement,
    buttonOpenPopupAddCard,
    buttonOpenPopupAvatarEdit,
    likeActiveClass
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
    avatarSelector: profileAvatar
});

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const editProfileInfo = (event, button, inputValues, closeCallback) => {
    renderLoading(true, button);
    const [name, description] = inputValues;
    api.updateClientInfo.call(api, name, description)
        .then(response => {
            userInfo.setUserInfo({
                name: response.name,
                about: response.about
            });
            closeCallback();
        })
        .catch(() => 'Ошибка обновления информации о профиле')
        .finally(() => renderLoading(false, button));
};
export const profileInfoPopup = new PopupWithForm(popupProfileInfoSelector, editProfileInfo);
profileInfoPopup.setEventListeners();

const editAvatar = (event, button, inputValues, closeCallback) => {
    renderLoading(true, button);
    const [newAvatarUrl] = inputValues;
    api.editAvatar.call(api, newAvatarUrl)
        .then(response => {
            userInfo.setUserInfo({
                avatarLink: response.avatar
            });
            closeCallback();
            avatarForm.disableButton();
        })
        .finally(() => renderLoading(false, button));
};
export const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, editAvatar);
editAvatarPopup.setEventListeners();

const addCard = (event, button, inputValues, closeCallback) => {
    renderLoading(true, button);
    const [cardName, cardImageLink] = inputValues;
    api.createCard.call(api, cardName, cardImageLink)
        .then(card => createCard(card, _id))
        .then(card => {
            cardList.addItem(card)
            closeCallback();
            newCardForm.disableButton(button);
        })
        .catch(() => 'Ошибка добавления карточки')
        .finally(() => renderLoading(false, button));
};
export const addCardPopup = new PopupWithForm(popupAddCardSelector, addCard);
addCardPopup.setEventListeners();

buttonOpenPopupProfileEdit.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    newProfileNameElement.value = userData.name;
    newProfileDescriptionElement.value = userData.about;

    profileInfoPopup.open();
});
buttonOpenPopupAddCard.addEventListener('click', () => addCardPopup.open());
buttonOpenPopupAvatarEdit.addEventListener('click', () => editAvatarPopup.open());

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
                handleCardDelete: api.deleteCard.bind(api)
            }, cardTemplate);
            cardObj.generate();
            return cardObj;
        })
        .then(cardElement => {
            cardElement.setLikeCounter(card.likes.length)
            return cardElement;
        })
        .then(cardElement => {
            cardElement.pressLikeIfClientLiked(card.likes, _id);
            return cardElement;
        })
        .then(cardElement => {
            cardElement.getDeleteButton().addEventListener('click', () => {
                api.deleteCard.call(api, card._id)
                    .then(() => cardElement.delete())
                    .catch(() => console.error(`Ошибка удаления карточки ${card._id}`))
                    .catch(() => 'Ошибка при удалении карточки');
            });
            return cardElement;
        })
        .then(cardElement => {
            const isCardOwner = card.owner._id === _id;
            cardElement.disableDeleteIfNotOwner(isCardOwner);
            return cardElement;
        })
        .then(cardElement => {
            cardElement.getLikeButton().addEventListener('click', event => {
                const method = event.target.classList.contains(likeActiveClass)
                    ? api.unlikeCard.bind(api)
                    : api.likeCard.bind(api);
                method(card._id)
                    .then(newLikesNumber => {
                        cardElement.toggleLike();
                        cardElement.setLikeCounter(newLikesNumber);
                    })
                    .catch(() => 'Ошибка при нажатии на лайк');
            });
            return cardElement;
        })
        .then(cardElement => cardElement.getElement())
}

const params = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const avatarForm = new FormValidator(params, document.querySelector('[name="editAvatar"]'));
const userInfoForm = new FormValidator(params, document.querySelector('[name="editUserInfo"]'));
const newCardForm = new FormValidator(params, document.querySelector('[name="addCard"]'));

avatarForm.enableValidation();
userInfoForm.enableValidation();
newCardForm.enableValidation();