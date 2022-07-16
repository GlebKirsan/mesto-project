import './pages/index.css';

import {enableValidation} from "./components/validation";
import * as modal from "./components/modal.js"

enableValidation({
    formSelector: '.popup__edit-area',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
});