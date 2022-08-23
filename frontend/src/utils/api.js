class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Ошибка')
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._checkResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then(this._checkResponse);
  }

  editUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._checkResponse);
  }

  putLike(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getAllNeededData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

export const api = new Api ({
  baseUrl: 'https://api.mrvinil.project.nomoredomains.sbs',
  headers: {
    authorization: '94f82fe8-d5f1-4c97-b104-8e3f90c97123',
    'Content-Type': 'application/json',
  }
});
