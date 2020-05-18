'use strict'

class FormValidator {
    constructor(form, button, errorMessage) {
        this.button = button;
        this.form = form;
        this.errorMessage = errorMessage;
    }

    setEventListeners() {
        this.form.addEventListener('input', () => {
            this.sendToValidate(this.form);
        });
    }

    setSubmitButtonState(isValid) {
        this.button.disabled = !isValid;
    }

    checkInputValidity(element) {
        this.elem = element;
        if (this.elem.tagName !== 'INPUT') return true;
        const validity = element.validity;
        if (validity.valid) {
            this.elem.nextElementSibling.textContent = '';
            return true;
        }
        if (validity.valueMissing) {
            this.elem.nextElementSibling.textContent = this.errorMessage.validationAbsenceRU;
            return false;
        }
        if (validity.tooShort) {
            this.elem.nextElementSibling.textContent = this.errorMessage.validationLenghtRU;
            return false;
        }
        if (validity.patternMismatch) {
            this.elem.nextElementSibling.textContent = this.errorMessage.validationLinkRu;
            return false;
        }
    }

    sendToValidate() {
        this.x = [...this.form.elements].reduce((acc, el) => this.checkInputValidity(el) && acc, true);
        this.setSubmitButtonState(this.x);
    }
}