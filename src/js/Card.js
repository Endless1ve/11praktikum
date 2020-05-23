'use strict'

export default class Card {
    constructor(dataCard, api) {
        this.api = api;
        this.dataCard = dataCard;
        this.name = dataCard.name;
        this.link = dataCard.link;
        this.liked = dataCard.likes.length;
        this.id = 'i' + dataCard._id;
        this.idEVENT = dataCard._id;
        this.removedCard = this.removedCard.bind(this);
        this.like = this.like.bind(this);
    }

    create() {
        this.card = `<div class='place-card' id='${this.id}'>
        <div class='place-card__image' style='background-image: url(${this.link})'>
            <button class='place-card__delete-icon'></button>
        </div>
        <div class='place-card__description'>
            <h3 class='place-card__name'>${this.name}</h3>
            <div class='place-card__like'>
                <button class='place-card__like-icon'></button>
                <p class='place-card__amount-like' data-like=''>${this.liked}</p>
            </div>
        </div>
    </div>`;
        return this.card;
    }

    setListener() {
        this.domElementCard = document.querySelector(`#${this.id}`);

        this.deleteButton = this.domElementCard.querySelector('.place-card__delete-icon');
        this.likeButton = this.domElementCard.querySelector('.place-card__like-icon');
        let likesArray = this.dataCard.likes;

        for (let el of likesArray) {
            if (el._id === 'f7d7515262a78904e35244d8') {
                this.likeButton.classList.add('place-card__like-icon_liked');
            }
        }

        this.deleteButton.addEventListener('click', this.removedCard);
        this.likeButton.addEventListener('click', this.like);

        this.myCardStyle();
    }

    myCardStyle() {
        if (this.dataCard.owner._id === 'f7d7515262a78904e35244d8') {
            this.deleteButton.style.display = 'flex';
        }
    }

    removeListener() {
        this.deleteButton.removeEventListener('click', this.removedCard);
        this.likeButton.removeEventListener('click', this.like);
    }

    like(event) {
        this.amountLike = this.domElementCard.querySelector('.place-card__amount-like');
        if (event.target.classList.value == 'place-card__like-icon place-card__like-icon_liked') {
            this.api.likeDELETE(this.idEVENT)
                .then(res => {
                    if (res) {
                        this.amountLike.textContent = this.amountLike.textContent - 1;
                        event.target.classList.remove('place-card__like-icon_liked');
                    }
                })
                .catch(err => console.log(`С запросом что-то не так ${err}`));
        } else {
            this.api.likePUT(this.idEVENT)
                .then(res => {
                    if (res) {
                        event.target.classList.add('place-card__like-icon_liked');
                        this.amountLike.textContent = `${res.likes.length}`;
                    }
                })
                .catch(err => console.log(`С запросом что-то не так ${err}`));
        }
    }

    removedCard(event) {
        let answer = confirm('Вы уверены что хотите удалить карточку?');
        if (answer) {
            this.api.deleteCard(this.idEVENT)
                .then(res => {
                    if (res.ok) {
                        this.removeListener();
                        event.target.closest('.place-card').remove();
                    }
                })
                .catch(err => console.log(`Не удалось удалить карточку\n${err}`));
        }
        return 0;
    }
}