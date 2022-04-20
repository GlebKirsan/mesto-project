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

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImageView = document.querySelector('.popup_image-view');

const openPopup = popup => {
    popup.classList.add('popup_opened');
};
const closePopup = popup => {
    popup.classList.remove('popup_opened')
}

const addCard = (name, link) => {
    const cardsContainer = document.querySelector('.cards');
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
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

    cardsContainer.prepend(card);
};

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    const profile = document.querySelector('.profile__info');
    const profileName = profile.querySelector('.profile__name');
    const profileDescription = profile.querySelector('.profile__description');

    popupEditProfile.querySelector('.popup__input_data_name').value = profileName.textContent;
    popupEditProfile.querySelector('.popup__input_data_description').value = profileDescription.textContent;

    openPopup(popupEditProfile);
});

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

const closePopupButtons = document.querySelectorAll('.popup__close-button');
closePopupButtons.forEach(button => button.addEventListener('click', event => {
    closePopup(event.target.closest('.popup'));
}));

popupEditProfile.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();

    const profileEditArea = event.target;
    const newProfileName = profileEditArea.querySelector('.popup__input_data_name').value;
    const newProfileDescription = profileEditArea.querySelector('.popup__input_data_description').value;

    const profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__name').textContent = newProfileName;
    profileInfo.querySelector('.profile__description').textContent = newProfileDescription;

    closePopup(event.target.closest('.popup'));
});
popupAddCard.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();

    const addCardEditArea = event.target;
    const newCardName = addCardEditArea.querySelector('.popup__input_data_name').value;
    const newCardLink = addCardEditArea.querySelector('.popup__input_data_link').value;
    addCard(newCardName, newCardLink);

    closePopup(event.target.closest('.popup'));
    addCardEditArea.querySelector('.popup__input_data_name').value = '';
    addCardEditArea.querySelector('.popup__input_data_link').value = '';
});

preExistingCards.forEach(card => addCard(card.name, card.link));