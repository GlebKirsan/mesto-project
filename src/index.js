import './pages/index.css';

import {enableValidation} from "./components/validation";
import {updateProfileInfo} from "./components/modal";

import {getCards, getClientInfo} from "./components/api";
import {checkImageAvailable, parseDateInCard, sortCardsByDate} from "./components/utils";
import {createCard, pressLikeIfClientLiked, renderCard, setLikeCounter} from "./components/card";

let _id;

getClientInfo()
    .then(clientInfo => {
        _id = clientInfo._id;
        updateProfileInfo(clientInfo.avatar, clientInfo.name, clientInfo.about);
    });

getCards()
    .then(cards => {
        cards = cards.map(parseDateInCard).sort(sortCardsByDate);
        cards.forEach(card => {
            checkImageAvailable(card.link)
                .then(() => createCard(card.name, card.link))
                .then(cardElement => setLikeCounter(cardElement, card.likes.length))
                .then(cardElement => {
                    const clientLiked = card.likes.map(user => user._id).includes(_id);
                    return pressLikeIfClientLiked(cardElement, clientLiked)
                })
                .then(renderCard)
                .catch(() => console.error(`Изображение ${card.name} по ссылке ${card.link} не доступно.`));
        });
    });

enableValidation({
    formSelector: '.popup__edit-area',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
});