import {openPopup} from "./modal";

import wizardImage from '../images/item-1.jpg';
import illitidImage from '../images/item-2.jpg';
import strahdImage from '../images/item-3.jpg';
import tiamatImage from '../images/item-4.jpg';
import goliathImage from '../images/item-5.jpg';
import artificierImage from '../images/item-6.jpg';

const cardsContainer = document.querySelector('.cards');
const popupImageView = document.querySelector('.popup_image-view');
const cardTemplate = document.querySelector('#card-template').content;
const cardForClone = cardTemplate.querySelector('.card');

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

const preExistingCards = [
    {
        name: "Волшебник",
        link: wizardImage
    },
    {
        name: "Иллитид над картой подземелья",
        link: illitidImage
    },
    {
        name: "Страд фон Зарович",
        link: strahdImage
    },
    {
        name: "Пятиглавый дракон Тиамат",
        link: tiamatImage
    },
    {
        name: "Голиаф",
        link: goliathImage
    },
    {
        name: "Изобретатель",
        link: artificierImage
    }
];
preExistingCards.forEach(card => renderCard(createCard(card.name, card.link)));

export {renderCard, createCard};