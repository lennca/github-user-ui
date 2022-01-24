import axios from 'axios'

const baseURL = process.env.BASE_URL || 'https://api.github.com'

const APIService = {
  searchOnUsername: async (username: string) => {
    try {
      const response = await axios.get(
        `${baseURL}/search/users?q=${username}+in:user`
      )
      return [response, null]
    } catch (error) {
      return [null, error]
    }
  },
}

export default APIService
