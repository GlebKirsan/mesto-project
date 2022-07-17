const groupIdentifier = 'plus-cohort-12';
const token = '5374e37d-a100-45c2-9054-8042aa4bada1';
const headers = {
    authorization: token, 'Content-Type': 'application/json'
};
const backendUrlPrefix = `https://mesto.nomoreparties.co/v1/${groupIdentifier}`;
const clientUrl = `${backendUrlPrefix}/users/me`;
const avatarEditUrl = `${clientUrl}/avatar`;
const cardsUrl = `${backendUrlPrefix}/cards`;
const cardLike = `${cardsUrl}/likes`;

function getJsonOrReject(result, errorMessage) {
    if (200 <= result.status && result.status < 300) {
        return result.json();
    }
    return Promise.reject(errorMessage + `${result.status}.`);
}

function getClientInfo() {
    return fetch(clientUrl, {
        headers
    }).then(result => getJsonOrReject(result, 'Ошибка получения информации о пользователе'));
}

function updateClientInfo(name, about) {
    return fetch(clientUrl, {
        method: 'PATCH', headers, body: JSON.stringify({
            name: name, about: about
        })
    }).then(result => getJsonOrReject(result, 'Ошибка обновлении информации о пользователе'));
}

function getCards() {
    return fetch(cardsUrl, {headers})
        .then(result => getJsonOrReject(result, 'Ошибка получения карточек'));
}

function createCard(name, link) {
    return fetch(cardsUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(result => getJsonOrReject(result, 'Ошибка создания новой карточки'));
}

function deleteCard(cardId) {
    return fetch(cardsUrl + `/${cardId}`, {
        method: 'DELETE',
        headers
    }).then(result => getJsonOrReject(result, 'Ошибка удаления карточки'));
}

function likeCard(cardId) {
    return fetch(cardLike + `/${cardId}`, {
        method: 'PUT',
        headers
    })
        .then(result => getJsonOrReject(result, 'Ошибка лайка карточки'))
        .then(card => card.likes.length);
}

function unlikeCard(cardId) {
    return fetch(cardLike + `/${cardId}`, {
        method: 'DELETE',
        headers
    })
        .then(result => getJsonOrReject(result, 'Ошибка удаления лайка карточки'))
        .then(card => card.likes.length);
}

function editAvatar(newAvatarUrl) {
    return fetch(avatarEditUrl, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            avatar: newAvatarUrl
        })
    })
}

export {getCards, getClientInfo, updateClientInfo, createCard, deleteCard, likeCard, unlikeCard, editAvatar};