import { shortenNumber } from "./utils";
import { likeActiveClass } from "./elements";

export default class Card {
    constructor({ data, handleCardClick, handleCardLike, handleCardUnlike, handleCardDelete }, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardUnlike = handleCardUnlike;
        this._handleCardDelete = handleCardDelete;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _likeListener(event) {
        const cardId = this._getCardId();
        const method = event.target.classList.contains(likeActiveClass)
            ? this._handleCardUnlike
            : this._handleCardLike;
        method(cardId)
            .then(newLikesNumber => this._updateLikes(event, newLikesNumber))
            .catch(() => 'Ошибка при нажатии на лайк');
    }

    _updateLikes(event, likesNumber) {
        event.target.classList.toggle(likeActiveClass);
        this._setLikeCounter(likesNumber);
    }

    _setLikeCounter(likesNumber) {
        this._element.querySelector('.card__likes-counter').textContent = shortenNumber(likesNumber);
    }

    _deleteListener(event) {
        const cardId = this._getCardId();
        this._handleCardDelete(cardId)
            .then(() => event.target.closest('.card').remove())
            .catch(() => console.error(`Ошибка удаления карточки ${cardId}`))
            .catch(() => 'Ошибка при удалении карточки');
    }

    _getCardId() {
        return this._element.querySelector('.card__id').textContent;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', event => this._likeListener(event));
        this._element.querySelector('.card__delete').addEventListener('click', event => this._deleteListener(event));
        this._cardImageElement.addEventListener('click', this._handleCardClick);
    }

    generate() {
        this._element = this._getElement();

        this._cardImageElement = this._element.querySelector('.card__image');
        this._cardImageElement.src = this._link;
        this._cardImageElement.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}

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

export {
    Card,
    setLikeCounter,
    pressLikeIfClientLiked,
    disableDeleteIfNotOwner,
    assignId,
    updateLikes
};