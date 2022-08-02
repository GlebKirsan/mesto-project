export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const newProfileNameElement = popupEditProfile.querySelector('.popup__input_data_name');
export const newProfileDescriptionElement = popupEditProfile.querySelector('.popup__input_data_description');
export const editProfileSubmitButton = popupEditProfile.querySelector('.popup__submit-button');

export const profileInfo = document.querySelector('.profile__info');
export const profileName = profileInfo.querySelector('.profile__name');
export const profileAvatar = document.querySelector('.profile__avatar-image');
export const profileDescription = profileInfo.querySelector('.profile__description');

export const popupAddCard = document.querySelector('.popup_add-card');
export const newCardNameElement = popupAddCard.querySelector('.popup__input_data_name');
export const newCardLinkElement = popupAddCard.querySelector('.popup__input_data_link');
export const addCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');

export const popupEditAvatar = document.querySelector('.popup_edit-avatar');
export const newAvatarUrlElement = popupEditAvatar.querySelector('.popup__input');
export const editAvatarSubmitButton = popupEditAvatar.querySelector('.popup__submit-button');

export const editProfileButton = document.querySelector('.profile__edit-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const closePopupButtons = document.querySelectorAll('.popup__close-button');

export const cardsContainer = document.querySelector('.cards');
export const popupImageView = document.querySelector('.popup_image-view');
export const popupImage = popupImageView.querySelector('.popup__image');
export const popupImageCaption = popupImageView.querySelector('.popup__image-caption');

export const cardTemplate = document.querySelector('#card-template').content;
export const cardForClone = cardTemplate.querySelector('.card');
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