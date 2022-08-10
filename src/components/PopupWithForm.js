import Popup from "./Popup";
import {disableButton} from "./utils";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__edit-area');
        this._sumbitButton = this._popup.querySelector('.popup__submit-button');
    }

    _getInputValues() {
        const inputs = [];
        Array.from(this._form.elements).forEach(element => inputs.push(element.value));
        return inputs;
    }

    close() {
        super.close();
        this._form.reset();
        disableButton(this._sumbitButton)
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallback(event, this._sumbitButton, this._getInputValues());
            this.close();
        });
    }

}