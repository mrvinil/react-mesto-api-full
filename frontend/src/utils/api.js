class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Ошибка');
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  likeCard(method, cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.mrvinil.project.nomoredomains.sbs/',
  headers: {
    'Content-Type': 'application/json'
  },
});
