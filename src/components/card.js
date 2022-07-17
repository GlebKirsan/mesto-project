import {shortenNumber} from "./utils";
import {cardForClone, cardsContainer, likeActiveClass} from "./elements";

function setLikeCounter(card, likesNumber) {
    card.querySelector('.card__likes-counter').textContent = shortenNumber(likesNumber);
    return card;
}

function updateLikes(event, likesNumber, card) {
    event.target.classList.toggle(likeActiveClass);
    setLikeCounter(card, likesNumber);
}

function pressLikeIfClientLiked(card, likes, clientId) {
    const clientLiked = likes.map(user => user._id).includes(clientId);
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

const createCard = (name, link, likeListener, deleteListener, openImageAction) => {
    const card = cardForClone.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    card.querySelector('.card__name').textContent = name;
    cardImage.src = link;

    cardImage.alt = name;
    card.querySelector('.card__like').addEventListener('click', event => likeListener(event, card));
    card.querySelector('.card__delete').addEventListener('click', event => deleteListener(event, card));

    cardImage.addEventListener('click', openImageAction);
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
    renderCardOnFirstLoad,
    updateLikes
};