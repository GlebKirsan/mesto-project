import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image')
        this._imageCaption = this._popup.querySelector('.popup__image-caption')
    }

    open(text, link) {
        this._image.src = link;
        this._image.alt = text;
        this._imageCaption.textContent = text;
        super.open();
    }
}