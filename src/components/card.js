import {openPopup} from "./modal";
import {deleteCard} from "./api";

const cardsContainer = document.querySelector('.cards');
const popupImageView = document.querySelector('.popup_image-view');
const popupImage = popupImageView.querySelector('.popup__image');
const popupImageCaption = popupImageView.querySelector('.popup__image-caption');

const cardTemplate = document.querySelector('#card-template').content;
const cardForClone = cardTemplate.querySelector('.card');

function setLikeCounter(card, likes) {
    card.querySelector('.card__likes-counter').textContent = likes;
    return card;
}

function pressLikeIfClientLiked(card, clientLiked) {
    if (clientLiked) {
        card.querySelector('.card__like').classList.add('card__like_active');
    }
    return card;
}

function disableDeleteIfNotOwner(card, isCardOwner) {
    if (!isCardOwner) {
        card.querySelector('.card__delete').remove();
    }
    return card;
}

function assignId(card, id) {
    card.querySelector('.card__id').textContent = id;
    return card;
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
        const cardId = card.querySelector('.card__id').textContent;
        deleteCard(cardId)
            .then(() => event.target.closest('.card').remove())
            .catch(() => console.error(`Ошибка удаления карточки ${cardId}`));
    });

    cardImage.addEventListener('click', () => {
        popupImage.src = link;
        popupImage.alt = name;
        popupImageCaption.textContent = name;
        openPopup(popupImageView);
    });
    return card;
}

const renderCard = card => {
    cardsContainer.prepend(card);
};

export {createCard, renderCard, setLikeCounter, pressLikeIfClientLiked, disableDeleteIfNotOwner, assignId};