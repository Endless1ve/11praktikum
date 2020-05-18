'use strict'

class ClearError {

    constructor(element) {
        this.elem = element;
    }
    clear() {
        for (let i = 0; i < this.elem.length; i++) {
            this.elem[i].textContent = '';
        }
    }
}