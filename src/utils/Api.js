class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //---------метод проверки запроса-------//
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
//---------метод запроса с сервера всех карточек-------//
  getAllCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  //------------метод запроса с сервера информации пользователя-----//
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  //-------------метод обновления информации пользователя----------//
  editUserInfo(userName, userAbout) {
    this._userName = userName;
    this._userAbout = userAbout;
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: this._userName,
        about: this._userAbout
      })
    })
      .then(this._checkResponse)
  }
  //-------------метод добавления новой карточки---------------//
  addCard(cardName, cardLink) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        "name": this._cardName,
        "link": this._cardLink
      })
    })
      .then(this._checkResponse)
  }
  //---------------метод удаления карточки-----------//
  deleteCard(idCard) {
    this._idCard = idCard;
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  //---------------метод обновления аватара------------//
  editAvatar(avatar) {
    this._avatar = avatar;
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: this._avatar,
      })
    })
      .then(this._checkResponse)
  }

  //-------------метод постановки лайка-------//
  likeCard(idCard, isLike) {
    if (isLike) {
      this._idCard = idCard;
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers
      })
        .then(this._checkResponse)
    }
    else {
      this._idCard = idCard;
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
        .then(this._checkResponse)
    }
  }

}

export const api = new Api({
    // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-29",
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://api.mesto.karakulin.nomoredomains.xyz",
    headers: {
      authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBjOTgyYTRmY2JmNTc1MTI2MGZhMjIiLCJpYXQiOjE2NDQ5OTI5NTMsImV4cCI6MTY0NTU5Nzc1M30.gxQVPmzBiKWuhbYzLwt65-dAn-_vShi7fdSWrYmR_SU",
      "Content-Type": "application/json",
    }, 
  });
