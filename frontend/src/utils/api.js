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
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
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
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      credentials: 'include',
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
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
});
