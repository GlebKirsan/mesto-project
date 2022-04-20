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

    cardsContainer.append(card);
};

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');

    popupEditProfile.querySelector('.popup__input_data_name').value = profileName.textContent;
    popupEditProfile.querySelector('.popup__input_data_description').value = profileDescription.textContent;

    popupEditProfile.classList.add('popup_opened');
});

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => popupAddCard.classList.add('popup_opened'));

const closePopupButtons = document.querySelectorAll('.popup__close-button');
closePopupButtons.forEach(button => button.addEventListener('click', event => {
    event.target.closest('.popup').classList.remove('popup_opened');
}));

popupEditProfile.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();

    const profileEditArea = event.target;
    let newProfileName = profileEditArea.querySelector('.popup__input_data_name').value;
    let newProfileDescription = profileEditArea.querySelector('.popup__input_data_description').value;

    const profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__name').textContent = newProfileName;
    profileInfo.querySelector('.profile__description').textContent = newProfileDescription;

    event.target.closest('.popup').classList.remove('popup_opened');
});
popupAddCard.querySelector('.popup__edit-area').addEventListener('submit', event => {
    event.preventDefault();

    const addCardEditArea = event.target;
    let newCardName = addCardEditArea.querySelector('.popup__input_data_name').value;
    let newCardLink = addCardEditArea.querySelector('.popup__input_data_link').value;

    addCard(newCardName, newCardLink);

    event.target.closest('.popup').classList.remove('popup_opened');
});

preExistingCards.forEach(card => addCard(card.name, card.link));