'use strict'

class Popup {
    constructor(element) {
        this.element = element;
        this._escKey = this._escKey.bind(this);
        this.close = this.close.bind(this);
        this.setEventListener();
    }

    open() {
        this.element.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._escKey);
    }

    close() {
        document.removeEventListener('keydown', this._escKey);
        this.element.classList.remove('popup_is-opened');
    }

    setEventListener() {
        this.element.querySelector('.popup__close')
            .addEventListener('click', this.close);
    }

    _escKey(event) {
        if (event.key === 'Escape') this.close();
    }
}