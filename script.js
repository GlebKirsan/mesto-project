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
    const popup = document.querySelector('.popup');
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');

    popup.querySelector('.popup__input_data_name').value = profileName.textContent;
    popup.querySelector('.popup__input_data_description').value = profileDescription.textContent;

    popup.classList.add('popup_opened');
});

const closePopupButton = document.querySelector('.popup__close-button');
closePopupButton.addEventListener('click', () => {
    document.querySelector('.popup').classList.remove('popup_opened');
});

const editArea = document.querySelector('.popup__edit-area');
editArea.addEventListener('submit', event => {
    event.preventDefault();

    let newProfileName = editArea.querySelector('.popup__input_data_name').value;
    let newProfileDescription = editArea.querySelector('.popup__input_data_description').value;

    const profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__name').textContent = newProfileName;
    profileInfo.querySelector('.profile__description').textContent = newProfileDescription;
})

preExistingCards.forEach(card => addCard(card.name, card.link));