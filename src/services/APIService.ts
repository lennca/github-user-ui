import axios, { AxiosResponse } from 'axios'
import IUserInfo from '../types/IUserInfo'

type response = Promise<[AxiosResponse<any, any> | null, null | unknown]>

const baseURL = process.env.BASE_URL || 'https://api.github.com'

const APIService = {
  // better name 'findAllByUsername'?
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
  findByUsername: async (username: string): Promise<[AxiosResponse<any, any> | null, null | unknown]> => {
    try {
      const response = await axios.get(`${baseURL}/users/${username}`)
      return [response, null]
    } catch (error) {
      return [null, error]
    }
  },
  findAllReposByUser: async (username: string): Promise<[AxiosResponse<any, any> | null, null | unknown]> => {
    try {
      const response = await axios.get(`${baseURL}/users/${username}/repos`)
      return [response, null]
    } catch (error: unknown) {
      return [null, error]
    }
  },
}

export default APIService
