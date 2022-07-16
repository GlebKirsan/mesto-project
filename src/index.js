import './pages/index.css';

import enableValidation from "./components/validation";
import {closePopup} from "./components/modal";

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
});

enableValidation({
    formSelector: '.popup__edit-area',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
});