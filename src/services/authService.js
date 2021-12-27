import FetchHelper from '@/helpers/fetchHelper'

import {
  setLoggedInEmail,
  getLoggedInEmail
} from '@/services/sessionProps'

import md5 from 'md5'

export const AuthService = {
  async getLoggedInEmail () {
    return getLoggedInEmail()
  },

  async logIn (login, password) {
    try {
      const passHash = md5(password)
      const fetchHelper = new FetchHelper()
      await fetch(`https://localhost:5001/api/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          passHash
        }),
      })
        .then(fetchHelper.handleErrors)
        .then(res => res.json())

      setLoggedInEmail(login)


      return true
    } catch (e) {
      //do nothing
    }

    setLoggedInEmail(null)
    return false
  },
  async logOut () {
    setLoggedInEmail(null)
  }
}

export function getAuthService () {
  return AuthService
}
