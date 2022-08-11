export default class FormValidator {
    constructor({
                    inputSelector,
                    submitButtonSelector,
                    inactiveButtonClass,
                    inputErrorClass,
                    errorClass
                }, popupForm) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._popupForm = popupForm;
        this._formInputs = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
        this._submitButton = this._popupForm.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._popupForm.addEventListener('submit', event => event.preventDefault());
        this._setEventListeners();
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._formInputs.forEach(formInput => formInput.addEventListener('input', () => {
            this._isValid(formInput);
            this._toggleButtonState();
        }))
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this._enableButton();
        }
    }

    _hasInvalidInput() {
        return this._formInputs.some(input => !input.validity.valid);
    };

    _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    };

    disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    };

    _isValid(formInput) {
        if (formInput.validity.valid) {
            this._hideInputError(formInput);
        } else {
            this._showInputError(formInput, formInput.validationMessage);
        }
    }

    _hideInputError(formInput) {
        const errorElement = this._popupForm.querySelector(`.${formInput.id}-error`);
        formInput.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _showInputError(formInput, errorMessage) {
        const errorElement = this._popupForm.querySelector(`.${formInput.id}-error`);
        formInput.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
}