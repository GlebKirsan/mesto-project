export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const newProfileNameElement = popupEditProfile.querySelector('.popup__input_data_name');
export const newProfileDescriptionElement = popupEditProfile.querySelector('.popup__input_data_description');

export const profileName = '.profile__name';
export const profileAvatar = '.profile__avatar-image';
export const profileDescription = '.profile__description';

export const buttonOpenPopupProfileEdit = document.querySelector('.profile__edit-button');
export const buttonOpenPopupAvatarEdit = document.querySelector('.profile__avatar-edit-button');
export const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');

export const cardsContainer = '.cards';
export const popupImageSelector = '.popup_image-view';
export const popupProfileInfoSelector = '.popup_edit-profile';
export const popupEditAvatarSelector = '.popup_edit-avatar';
export const popupAddCardSelector = '.popup_add-card';

export const cardTemplate = '#card-template';
export const likeActiveClass = 'card__like_active';

export const groupIdentifier = 'plus-cohort-12';
export const token = '5374e37d-a100-45c2-9054-8042aa4bada1';
export const backendUrlPrefix = `https://mesto.nomoreparties.co/v1/${groupIdentifier}`;
export const apiOptions = {
    baseUrl: backendUrlPrefix,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
}