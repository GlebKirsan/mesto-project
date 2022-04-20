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

const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const newProfileNameElement = popupEditProfile.querySelector('.popup__input_data_name');
const newProfileDescriptionElement = popupEditProfile.querySelector('.popup__input_data_description');
const profile = document.querySelector('.profile__info');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

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
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');

    card.querySelector('.card__name').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    return card;
}

const renderCard = (name, link) => {
    const newCard = createCard(name, link);

    newCard.querySelector('.card__like').addEventListener('click', event => {
        event.target.classList.toggle('card__like_active');
    });
    newCard.querySelector('.card__delete').addEventListener('click', event => {
        event.target.closest('.card').remove();
    });
    newCard.querySelector('.card__image').addEventListener('click', () => {
        popupImageView.querySelector('.popup__image').src = link;
        popupImageView.querySelector('.popup__image').alt = name;
        popupImageView.querySelector('.popup__image-caption').textContent = name;
        openPopup(popupImageView);
    });

    cardsContainer.prepend(newCard);
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
    const newCardName = newCardNameElement.value;
    const newCardLink = newCardLinkElement.value;
    renderCard(newCardName, newCardLink);

    closePopup(event.target.closest('.popup'));
    newCardNameElement.value = '';
    newCardLinkElement.value = '';
});

preExistingCards.forEach(card => renderCard(card.name, card.link));