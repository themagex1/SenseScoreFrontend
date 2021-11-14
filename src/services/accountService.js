import axios from 'axios'
import md5 from 'md5'

const AccountService = {
  async addAccount (eMail, username, password) {
    try {
      const data = await axios.post(`https://localhost:5001/Account/register`, {
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

}

export function getAccountService () {
  return AccountService
}
