import React, { ChangeEvent, useState } from 'react'

import logo from '../assets/logo-github.png'
import UserRow from '../components/UserRow'
import HttpService from '../services/HttpService'
import IUser from '../types/IUser'

function StartPage() {
  const [username, setUsername] = useState<string>('')
  const [users, setUsers] = useState<IUser[]>([])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleOnSubmit = async () => {
    const [response, error]: [IUser[] | null, null | unknown] = await HttpService.searchOnUsername(username)
    if (error || !response) {
      console.error(error)
      return
    }
    setUsers(response)
  }

  return (
    <div className='container flex flex-col items-center w-full h-full px-3 mx-auto space-y-4 sm:w-3/4'>
      <div className='flex flex-col items-center w-full'>
        <img className='w-3/4' src={logo} alt='Logo cat' />
        <h1>Github User Search</h1>
      </div>
      <div className='flex w-full space-x-2 sm:w-3/4'>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Find a GitHub user...'
          value={username}
          onChange={handleOnChange}
          className='input-text'
        />
        <button onClick={handleOnSubmit} type='submit' className='btn-green'>
          Search
        </button>
      </div>
      <div className='w-full sm:w-3/4'>
        <p className='mb-4 h3'>{users.length} users found</p>
        {users.map((user: IUser) => (
          <UserRow user={user} key={user.id} />
        ))}
      </div>
    </div>
  )
}

export default StartPage
