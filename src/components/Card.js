import {shortenNumber} from "./utils";
import {likeActiveClass} from "./constants";

export default class Card {
    constructor({ data, handleCardClick, handleCardDelete }, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
    }

    _getElement() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    toggleLike() {
        this._likeElement.classList.toggle(likeActiveClass);
    }

    setLikeCounter(likesNumber) {
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
    }

    assignId(id) {
        this._element.querySelector('.card__id').textContent = id;
    }

    disableDeleteIfNotOwner(isCardOwner) {
        if (!isCardOwner) {
            this._element.querySelector('.card__delete').remove();
        }
    }

    pressLikeIfClientLiked(likes, clientId) {
        const clientLiked = likes.map(user => user._id).includes(clientId);
        if (clientLiked) {
            this._element.querySelector('.card__like').classList.add('card__like_active');
        }
    }

    getElement() {
        return this._element;
    }

    getLikeButton() {
        return this._likeElement;
    }
}