// export const BASE_URL = "https://auth.nomoreparties.co";
export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://api.mesto.karakulin.nomoredomains.xyz";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then(_checkResponse)
    .then((res) => {
      return res;
    }) 
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then(_checkResponse)
    .then((data) => {
      return data;
    })
};

// export const checkToken = (token) => {
  export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
  })
    .then(_checkResponse)
    .then((data) => data)
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
      method: 'DELETE',
      credentials: 'include'
  })
      .then(_checkResponse)
      .then((data) => data)
}

  //---------метод проверки запроса-------//
 const _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
