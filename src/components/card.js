import {openPopup} from "./modal";
import {deleteCard, likeCard, unlikeCard} from "./api";
import {shortenNumber} from "./utils";

const cardsContainer = document.querySelector('.cards');
const popupImageView = document.querySelector('.popup_image-view');
const popupImage = popupImageView.querySelector('.popup__image');
const popupImageCaption = popupImageView.querySelector('.popup__image-caption');

const cardTemplate = document.querySelector('#card-template').content;
const cardForClone = cardTemplate.querySelector('.card');
const likeActiveClass = 'card__like_active';

function setLikeCounter(card, likesNumber) {
    card.querySelector('.card__likes-counter').textContent = shortenNumber(likesNumber);
    return card;
}

function updateLikes(event, likesNumber, card) {
    event.target.classList.toggle(likeActiveClass);
    setLikeCounter(card, likesNumber);
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
        const cardId = card.querySelector('.card__id').textContent;
        const method = event.target.classList.contains(likeActiveClass) ? unlikeCard : likeCard;
        method(cardId)
            .then(newLikesNumber => updateLikes(event, newLikesNumber, card));
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

const renderCardOnFirstLoad = card => {
    cardsContainer.append(card);
}

const renderCard = card => {
    cardsContainer.prepend(card);
};

export {
    createCard,
    renderCard,
    setLikeCounter,
    pressLikeIfClientLiked,
    disableDeleteIfNotOwner,
    assignId,
    renderCardOnFirstLoad
};