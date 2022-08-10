export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('click', event => this._closeByClickOutside(event));
        document.addEventListener('keydown', event => this._handleEscClose(event));
    }

    close() {
        this._popup.classList.remove('popup_opened')
        this._popup.removeEventListener('click', event => this._closeByClickOutside(event));
        document.removeEventListener('keydown', event => this._handleEscClose(event));
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
    }

    _closeByClickOutside(event) {
        if (event.target.offsetParent === null) {
            this.close();
        }
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
}