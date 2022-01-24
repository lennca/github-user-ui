import React, { ChangeEvent, useState } from 'react'
import logo from '../assets/logo.png'
import APIService from '../services/APIService'

interface IUser {
  id: number
  avatar_url: string
  html_url: string
  repos_url: string
  type: string
  login: string
}

function StartPage() {
  const [username, setUsername] = useState<string>('')
  const [users, setUsers] = useState([])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleOnSubmit = async () => {
    const [response, error]: any = await APIService.searchOnUsername(username)
    if (error) {
      console.log('error', error)
      return
    }
    setUsers(response.data.items)
  }

  return (
    <div className='w-3/4 container mx-auto h-full flex flex-col items-center'>
      {/* image */}
      <div className='w-full flex items-center flex-col w-3/4 mb-4'>
        <img className='w-3/4' src={logo} alt='Logo cat' />
        <h1 className='text-4xl font-bold text-slate-100'>
          Github User Search
        </h1>
      </div>
      {/* input container */}
      <div className='w-3/4 flex flex-row mb-4'>
        {/* input */}
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Username...'
          value={username}
          onChange={handleOnChange}
          className='text-white border bg-black py-3 px-4 custom-github-input mr-2 block w-full text-sm border-gray-700 rounded-md focus:outline-none'
        />
        {/* submit button */}
        <button
          onClick={handleOnSubmit}
          type='submit'
          className='w-1/4 items-center justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-green-600 custom-github-button hover:bg-green-500'>
          Search
        </button>
      </div>
      {/* list */}
      <div className='w-3/4'>
        <p className='text-slate-200 text-2xl mb-4'>
          {users.length} users found
        </p>
        {users.map((person: IUser) => {
          return (
            <div
              key={person.id}
              className='flex items-center bg-slate-200 mb-2 rounded-md p-3'>
              <div className='flex-item h-10 mr-4'>
                <img
                  className='h-10 w-10 rounded-full'
                  src={person.avatar_url}
                  alt='User avatar'
                />
              </div>
              <div className='mr-4 flex-item-20'>
                <div className='text-sm font-medium text-gray-900'>
                  {person.login}
                </div>
              </div>
              <div className='mr-4 flex-item'>
                <div className='text-sm text-gray-500 '>{person.type}</div>
              </div>
              <div className='mr-4 flex-item-20 text-right'>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={person.html_url}
                  className='text-sm font-medium text-indigo-600 hover:text-indigo-900'>
                  Github Profile
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StartPage
