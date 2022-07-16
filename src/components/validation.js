const hideInputError = (formElement, formInput, validationSelectors) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(validationSelectors.inputErrorClass);
    errorElement.classList.remove(validationSelectors.errorClass);
    errorElement.textContent = '';
};

const showInputError = (formElement, formInput, errorMessage, validationSelectors) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(validationSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSelectors.errorClass);
};

const isValid = (formElement, formInput, validationSelectors) => {
    if (formInput.validity.valid) {
        hideInputError(formElement, formInput, validationSelectors);
    } else {
        showInputError(formElement, formInput, formInput.validationMessage, validationSelectors);
    }
};

const hasInvalidInput = inputList => {
    return inputList.some(input => !input.validity.valid);
};

const enableButton = (button, inactiveButtonClass) => {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
};

const disableButton = (button, inactiveButtonClass) => {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass);
    } else {
        enableButton(buttonElement, inactiveButtonClass);
    }
}

const setEventListeners = (popupForm, validationSelectors) => {
    const formInputs = Array.from(popupForm.querySelectorAll(validationSelectors.inputSelector));
    const submitButton = popupForm.querySelector(validationSelectors.submitButtonSelector);
    toggleButtonState(formInputs, submitButton, validationSelectors.inactiveButtonClass);

    formInputs.forEach(formInput => formInput.addEventListener('input', () => {
        isValid(popupForm, formInput, validationSelectors);
        toggleButtonState(formInputs, submitButton, validationSelectors.inactiveButtonClass);
    }));
};

const enableValidation = validationSelectors => {
    const popupForms = Array.from(document.querySelectorAll(validationSelectors.formSelector));

    popupForms.forEach(popupForm => {
        popupForm.addEventListener('submit', event => event.preventDefault());
        setEventListeners(popupForm, validationSelectors);
    })
};

export default enableValidation;