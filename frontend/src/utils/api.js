class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._getResponseData);
  };

  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._getResponseData);
  };

  setUserInfo(data, token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._getResponseData);
  }

  createNewCard(name, link, token) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponseData);
  };


  deleteCard(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  };

  addLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  deleteLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  updateUserAvatar(avatar, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._getResponseData);
  }

  getUserInfoAuth(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._getResponseData);
  }

  login(email, password) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(this._getResponseData);
  }

  register(email, password) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(this._getResponseData);
  }

}

export const api = new Api({
  baseUrl: 'https://api.mesto-darya.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});