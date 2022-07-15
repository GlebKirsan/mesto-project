const preExistingCards = [
    {
        name: "Волшебник",
        link: "./images/item-1.jpg"
    },
    {
        name: "Иллитид над картой подземелья",
        link: "./images/item-2.jpg"
    },
    {
        name: "Страд фон Зарович",
        link: "./images/item-3.jpg"
    },
    {
        name: "Пятиглавый дракон Тиамат",
        link: "./images/item-4.jpg"
    },
    {
        name: "Голиаф",
        link: "./images/item-5.jpg"
    },
    {
        name: "Изобретатель",
        link: "./images/item-6.jpg"
    }
];

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const cardForClone = cardTemplate.querySelector('.card');

const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const newProfileNameElement = popupEditProfile.querySelector('.popup__input_data_name');
const newProfileDescriptionElement = popupEditProfile.querySelector('.popup__input_data_description');
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');

const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const newCardNameElement = popupAddCard.querySelector('.popup__input_data_name');
const newCardLinkElement = popupAddCard.querySelector('.popup__input_data_link');

const popupImageView = document.querySelector('.popup_image-view');

const openPopup = popup => {
    popup.classList.add('popup_opened');
};
const closePopup = popup => {
    popup.classList.remove('popup_opened')
}

const createCard = (name, link) => {
    const card = cardForClone.cloneNode(true);
    const cardImage = card.querySelector('.card__image');

    card.querySelector('.card__name').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    card.querySelector('.card__like').addEventListener('click', event => {
        event.target.classList.toggle('card__like_active');
    });
    card.querySelector('.card__delete').addEventListener('click', event => {
        event.target.closest('.card').remove();
    });
    cardImage.addEventListener('click', () => {
        popupImageView.querySelector('.popup__image').src = link;
        popupImageView.querySelector('.popup__image').alt = name;
        popupImageView.querySelector('.popup__image-caption').textContent = name;
        openPopup(popupImageView);
    });

    return card;
}

const renderCard = card => {
    cardsContainer.prepend(card);
};

editProfileButton.addEventListener('click', () => {
    newProfileNameElement.value = profileName.textContent;
    newProfileDescriptionElement.value = profileDescription.textContent;

    openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => openPopup(popupAddCard));

const closePopupButtons = document.querySelectorAll('.popup__close-button');
closePopupButtons.forEach(button => button.addEventListener('click', event => {
    closePopup(event.target.closest('.popup'));
}));

popupEditProfile.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();

    profileName.textContent = newProfileNameElement.value;
    profileDescription.textContent = newProfileDescriptionElement.value;

    closePopup(event.target.closest('.popup'));
});
popupAddCard.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();
    const newCard = createCard(newCardNameElement.value, newCardLinkElement.value);
    renderCard(newCard);

    closePopup(event.target.closest('.popup'));
    newCardNameElement.value = '';
    newCardLinkElement.value = '';
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
});

document.querySelectorAll('.popup').forEach(popup => popup.addEventListener('click', event => {
    const isClickOnImage = event.target.classList.contains('popup__figure-container');
    const isClickOnPopup = event.target.classList.contains('popup__container');
    if (!isClickOnPopup && !isClickOnImage) {
        closePopup(event.target);
    }
}));

preExistingCards.forEach(card => renderCard(createCard(card.name, card.link)));

const hideInputError = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const showInputError = (formElement, formInput, errorMessage) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const isValid = (formElement, formInput) => {
    if (formInput.validity.valid) {
        hideInputError(formElement, formInput);
    } else {
        showInputError(formElement, formInput, formInput.validationMessage);
    }
};

const hasInvalidInput = inputList => {
    return inputList.some(input => !input.validity.valid);
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_inactive');
        buttonElement.setAttribute('disabled', false);
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
        buttonElement.setAttribute('disabled', true);
    }
}

const setEventListeners = popupForm => {
    const formInputs = Array.from(popupForm.querySelectorAll('.popup__input'));
    const submitButton = popupForm.querySelector('.popup__submit-button');
    toggleButtonState(formInputs, submitButton);

    formInputs.forEach(formInput => formInput.addEventListener('input', () => {
        isValid(popupForm, formInput);
        toggleButtonState(formInputs, submitButton);
    }));
};

const enableValidation = () => {
    const popupForms = Array.from(document.querySelectorAll('.popup__edit-area'));

    popupForms.forEach(popupForm => {
        popupForm.addEventListener('submit', event => event.preventDefault());
        setEventListeners(popupForm);
    })
};

enableValidation();