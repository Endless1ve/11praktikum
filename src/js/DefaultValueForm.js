'use strict'

export default class DefaultValueForm {
    constructor(editName, editAbout) {
        this.editName = editName;
        this.editAbout = editAbout;
    }

    defaultValue() {
        this.editName.value = document.querySelector('.user-info__name').textContent;
        this.editAbout.value = document.querySelector('.user-info__job').textContent;
    }
}