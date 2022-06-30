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

    return card;
};

function likeCard(event) {
    if (event.target.classList.contains('card__like')) {
        event.target.classList.toggle('card__like_active');
    }
}

function deleteCard(event) {
    if (event.target.classList.contains('card__delete')) {
        event.target.closest('.card').remove();
    }
}

function openCard(event) {
    if (event.target.classList.contains('card__image')) {
        const cardName = event.target.alt;
        popupImageView.querySelector('.popup__image').src = event.target.src;
        popupImageView.querySelector('.popup__image').alt = cardName;
        popupImageView.querySelector('.popup__image-caption').textContent = cardName;
        openPopup(popupImageView);
    }
}

cardsContainer.addEventListener('click', likeCard);
cardsContainer.addEventListener('click', deleteCard);
cardsContainer.addEventListener('click', openCard);

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

preExistingCards.forEach(card => renderCard(createCard(card.name, card.link)));