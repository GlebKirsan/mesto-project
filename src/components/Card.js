import {shortenNumber} from "./utils";
import {likeActiveClass} from "./constants";

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
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _likeListener() {
        const cardId = this._getCardId();
        const method = this._likeElement.classList.contains(likeActiveClass)
            ? this._handleCardUnlike
            : this._handleCardLike;
        method(cardId)
            .then(newLikesNumber => this._updateLikes(newLikesNumber))
            .catch(() => 'Ошибка при нажатии на лайк');
    }

    _updateLikes(likesNumber) {
        this._likeElement.classList.toggle(likeActiveClass);
        this._setLikeCounter(likesNumber);
    }

    _setLikeCounter(likesNumber) {
        this._element.querySelector('.card__likes-counter').textContent = shortenNumber(likesNumber);
    }

    _deleteListener() {
        const cardId = this._getCardId();
        this._handleCardDelete(cardId)
            .then(() => this._element.closest('.card').remove())
            .catch(() => console.error(`Ошибка удаления карточки ${cardId}`))
            .catch(() => 'Ошибка при удалении карточки');
        this._element = null;
        }

    _getCardId() {
        return this._element.querySelector('.card__id').textContent;
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', () => this._likeListener());
        this._element.querySelector('.card__delete').addEventListener('click', () => this._deleteListener());
        this._cardImageElement.addEventListener('click', this._handleCardClick);
    }

    generate() {
        this._element = this._getElement();

        this._cardImageElement = this._element.querySelector('.card__image');
        this._cardImageElement.src = this._link;
        this._cardImageElement.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        this._likeElement = this._element.querySelector('.card__like');

        this._setEventListeners();

        return this._element;
    }
}

function setLikeCounter(card, likesNumber) {
    card.querySelector('.card__likes-counter').textContent = shortenNumber(likesNumber);
    return card;
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
    assignId
};