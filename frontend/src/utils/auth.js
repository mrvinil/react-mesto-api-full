export const BASE_URL = 'https://api.mrvinil.project.nomoredomains.sbs';

const checkResponse = response => {
  if(response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then(checkResponse)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        return data.token;
      }
    })
}

export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
    .then(checkResponse)
}






















