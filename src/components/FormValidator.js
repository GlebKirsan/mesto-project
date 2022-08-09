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
    }

    enableValidation() {
        this._popupForm.addEventListener('submit', event => event.preventDefault());
        this._setEventListeners();
    }

    _setEventListeners() {
        const formInputs = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
        const submitButton = this._popupForm.querySelector(this._submitButtonSelector);
        this._toggleButtonState(formInputs, submitButton);

        formInputs.forEach(formInput => formInput.addEventListener('input', () => {
            this._isValid(formInput);
            this._toggleButtonState(formInputs, submitButton);
        }))
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(buttonElement);
        } else {
            this._enableButton(buttonElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some(input => !input.validity.valid);
    };

    _enableButton(button) {
        button.classList.remove(this._inactiveButtonClass);
        button.disabled = false;
    };

    _disableButton(button) {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
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