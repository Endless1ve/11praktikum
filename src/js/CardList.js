'use strict'

export default class CardList {
    constructor(container) {
        this.container = container;
    }

    addCard(cardElem) {
        this.cardElem = cardElem;
        this.container.insertAdjacentHTML('beforeend', this.cardElem.create());
        cardElem.setListener();
    }

    render(elem) {
        elem.forEach((element) => this.addCard(element));
    }
}