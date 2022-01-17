import axios from 'axios'
import TokenService from './token.service'
import * as sha256 from 'sha256'
const API_URL = 'api/Account/'

class AuthService {
  login ({ login, passHash }) {
    return axios
      .post(API_URL + 'login', {
        login: login,
        passHash: sha256(passHash)
      })
      .then(response => {
        if (response.data.access_token && response.data.refresh_token) {
          localStorage.setItem('user', login)
          localStorage.setItem('refreshToken', response.data.refresh_token)
          localStorage.setItem('bearer', response.data.access_token)
          localStorage.setItem('isAuthenticated', response.data.initialized)
          TokenService.setUser(response.data.access_token, response.data.refresh_token)
        }
        return response.data
      })
  }

  logout () {
    TokenService.removeUser()
  }

  register ({ username, eMail, passHash }) {
    return axios.post(API_URL + 'register', {
      username: username,
      eMail: eMail,
      passHash: passHash
    })
  }
}

export default new AuthService()
