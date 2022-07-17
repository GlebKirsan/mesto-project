const groupIdentifier = 'plus-cohort-12';
const token = '5374e37d-a100-45c2-9054-8042aa4bada1';
const backendUrlPrefix = `https://mesto.nomoreparties.co/v1/${groupIdentifier}`;
const clientUrl = `${backendUrlPrefix}/users/me`;
const cardsUrl = `${backendUrlPrefix}/cards`;

function getClientInfo() {
    return fetch(clientUrl, {
        headers: {
            authorization: token
        }
    }).then(result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`Ошибка получения информации о пользователе ${result.status}`);
    })
}

function getCards() {
    return fetch(cardsUrl, {
        headers: {
            authorization: token
        }
    }).then(result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`Ошибка получения карточек ${result.status}`);
    });
}

export {getCards, getClientInfo};