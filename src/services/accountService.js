import axios from 'axios'
import md5 from 'md5'
import {getAuthToken} from '@/services/sessionProps'
import InvalidFieldError from '@/InvalidFieldError'
const AccountService = {
  async addAccount (eMail, username, password) {
    try {
      const data = await axios.post(`https://localhost:5001/api/Account/register`, {
          username: username,
          email: eMail,
          passHash: md5(password)
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      return data
    } catch (e) {
      //do nothing
    }
  },

  async resetPassword(eMail, token, password) {
    try {
      const data = await axios.post('https://localhost:5001/api/Account/resetpassword', {
        email: eMail,
        token: token,
        passHash: md5(password)

      },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: getAuthToken(),
          }
        })
      return data
    }
    catch (e) {
      throw new InvalidFieldError({
        email: e.message
      })
    }
  }

}

export function getAccountService () {
  return AccountService
}
