export default class Api {
    constructor(url, token) {
        this.token = token;
        this.url = url;
    }

    updateAvatar(link) {
        return fetch(`${this.url}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: `${link}`
                })
            })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }

    likePUT(id) {
        return fetch(`${this.url}/cards/like/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this.token
                }
            })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }

    likeDELETE(id) {
        return fetch(`${this.url}/cards/like/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token
                }
            })
            .then(res => {
                if (res.status === 200) return res;
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }

    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token
                }
            })
            .then(res => {
                if (res.status === 200) return res;
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }

    addNewCard(name, link) {
        return fetch(`${this.url}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${name}`,
                    link: `${link}`
                }, )
            })
            .then(res => {
                if (res.ok) return res.json();
                Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }

    userInfo() {
        return fetch(`${this.url}/users/me`, {
                headers: {
                    authorization: this.token
                }
            })
            // Можно лучше -- повторяющуюся во всех методах часть вынести в отдельный метод класса
            .then(res => {
                if (res.ok) {
                    return Promise.resolve(res.json());
                }
                Promise.reject(new Error(`Ошибка сервера: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }

    takeCards() {
        return fetch(`${this.url}/cards`, {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => {
                if (res.ok) {
                    return Promise.resolve(res.json());
                }
                Promise.reject(new Error(`Ошибка сервера: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }

    newInfoUser(name, about) {
        return fetch(`${this.url}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${name}`,
                    about: `${about}`
                })
            })
            .then(res => {
                if (res.ok) return res;
                Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(new Error(`Ошибка соединения: ${err.message}`)));
    }
}