import {shortenNumber} from "./utils";
import {likeActiveClass} from "./constants";

export default class Card {
    constructor({ data, cardClickCallback, likeCallback, deleteCallback, isOwner, clientLiked }, selector) {
        this._name = data.name;
        this._link = data.link;
        this._initialLikes = data.likes.length;
        this._selector = selector;
        this._cardClickCallback = cardClickCallback;
        this._likeCallback = likeCallback;
        this._deleteCallback = deleteCallback;
        this._isOwner = isOwner;
        this._clientLiked = clientLiked;
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

    delete() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardImageElement.addEventListener('click', this._cardClickCallback);
        this._likeElement.addEventListener('click', this._likeCallback);
        this._element.querySelector('.card__delete').addEventListener('click', this._deleteCallback);
    }

    generate() {
        this._element = this._getElement();

        this._cardImageElement = this._element.querySelector('.card__image');
        this._cardImageElement.src = this._link;
        this._cardImageElement.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        this._likeElement = this._element.querySelector('.card__like');

        this.setLikeCounter(this._initialLikes);
        this._setEventListeners();
        this._disableDeleteIfNotOwner();
        this._pressLikeIfClientLiked();

        return this._element;
    }

    _disableDeleteIfNotOwner() {
        if (!this._isOwner) {
            this._element.querySelector('.card__delete').remove();
        }
    }

    _pressLikeIfClientLiked() {
        if (this._clientLiked) {
            this._element.querySelector('.card__like').classList.add(likeActiveClass);
        }
    }

    isLiked() {
        return this._likeElement.classList.contains(likeActiveClass);
    }

}