export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getClientInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(result => this._getJsonOrReject(result, 'Ошибка получения информации о пользователе'));
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(result => this._getJsonOrReject(result, 'Ошибка получения карточек'));
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(result => this._getJsonOrReject(result, 'Ошибка лайка карточки'))
            .then(card => card.likes.length);
    }

    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(result => this._getJsonOrReject(result, 'Ошибка удаления лайка карточки'))
            .then(card => card.likes.length);
    }

    createCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name, link: link
            })
        }).then(result => this._getJsonOrReject(result, 'Ошибка создания новой карточки'));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(result => this._getJsonOrReject(result, 'Ошибка удаления карточки'));
    }

    updateClientInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name, about: about
            })
        }).then(result => this._getJsonOrReject(result, 'Ошибка обновлении информации о пользователе'));
    }

    editAvatar(newAvatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatarUrl
            })
        }).then(result => this._getJsonOrReject(result, 'Ошибка обновления аватара пользователя'));
    }

    _getJsonOrReject(result, errorMessage) {
        if (200 <= result.status && result.status < 300) {
            return result.json();
        }
        return Promise.reject(errorMessage + ` ${result.status}.`);
    }
}