import axios, { AxiosInstance, AxiosResponse } from 'axios'

class HttpService {
  url = ''
  axios: AxiosInstance = axios.create()

  constructor() {
    const { REACT_APP_DEMO, REACT_APP_BASE_URL = 'https://api.github.com' } = process.env
    this.url = REACT_APP_BASE_URL

    // set axios configuration
    let axiosInstance
    if (REACT_APP_DEMO && REACT_APP_DEMO.toLowerCase() === 'false') {
      axiosInstance = axios.create({
        baseURL: this.url,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        }
      })
    } else {
      axiosInstance = axios.create({
        baseURL: this.url
      })
    }
    this.axios = axiosInstance

    // bind methods to class
    this.searchOnUsername = this.searchOnUsername.bind(this)
    this.findByUsername = this.findByUsername.bind(this)
    this.findAllReposByUser = this.findAllReposByUser.bind(this)
  }

  async searchOnUsername(username: string) {
    try {
      const response = await this.axios.get(`/search/users?q=${username}+in:user`)
      return [response, null]
    } catch (error) {
      return [null, error]
    }
  }

  async findByUsername(username: string): Promise<[AxiosResponse<any, any> | null, null | unknown]> {
    try {
      const response = await this.axios.get(`/users/${username}`)
      return [response, null]
    } catch (error) {
      return [null, error]
    }
  }

  async findAllReposByUser(username: string): Promise<[AxiosResponse<any, any> | null, null | unknown]> {
    try {
      const response = await this.axios.get(`${this.url}/users/${username}/repos`)
      return [response, null]
    } catch (error: unknown) {
      return [null, error]
    }
  }
}

export default new HttpService()
