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
    <div className='w-full sm:w-3/4 container mx-auto h-full flex flex-col items-center px-3'>
      <div className='w-full flex items-center flex-col mb-4'>
        <img className='w-3/4' src={logo} alt='Logo cat' />
        <h1>Github User Search</h1>
      </div>
      <div className='w-full sm:w-3/4 flex mb-4'>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Find a GitHub user...'
          value={username}
          onChange={handleOnChange}
          className='py-3 px-4 mr-2 block w-full text-sm github-input rounded-md'
        />
        <button onClick={handleOnSubmit} type='submit' className='w-1/4 py-2 px-4 rounded-md github-btn-green'>
          Search
        </button>
      </div>
      <div className='w-full sm:w-3/4'>
        <p className='h3 mb-4'>{users.length} users found</p>
        {users.map((user: IUser) => (
          <UserRow user={user} key={user.id} />
        ))}
      </div>
    </div>
  )
}

export default StartPage
