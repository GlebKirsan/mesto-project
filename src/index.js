import './pages/index.css';

import {enableValidation} from "./components/validation";
import {updateProfileInfo} from "./components/modal";

import {getCards, getClientInfo} from "./components/api";
import {checkImageAvailable} from "./components/utils";
import {createCard, renderCard} from "./components/card";

let _id;

getCards()
    .then(cards => {
        cards.sort((lhs, rhs) => rhs.createdAt - lhs.createdAt);
        cards.forEach(card => {
            checkImageAvailable(card.link)
                .then(() => createCard(card.name, card.link))
                .then(renderCard)
                .catch(() => console.error(`Изображение ${card.name} по ссылке ${card.link} не доступно.`));
        });
    });

getClientInfo()
    .then(clientInfo => {
        _id = clientInfo._id;
        updateProfileInfo(clientInfo.avatar, clientInfo.name, clientInfo.about);
    });

enableValidation({
    formSelector: '.popup__edit-area',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
});