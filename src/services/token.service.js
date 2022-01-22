class TokenService {
  getLocalRefreshToken () {
    const user = localStorage.getItem('refreshToken')
    return user
  }

  getLocalAccessToken () {
    const user = localStorage.getItem('accessToken')
    return user
  }

  updateLocalAccessToken (token) {
    //let user = localStorage.getItem('accessToken')
    //user.accessToken = token
    localStorage.setItem('accessToken', token)
  }

  updateLocalRefreshToken (token) {
    //let user = localStorage.getItem('refreshToken')
    //user.refreshToken = token
    localStorage.setItem('refreshToken', token)
  }

  getUser () {
    return localStorage.getItem('accessToken')
  }

  setUser (accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  removeUser () {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}

export default new TokenService()
