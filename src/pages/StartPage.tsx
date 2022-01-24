import React, { ChangeEvent, useState } from 'react'
import logo from '../assets/logo.png'
import UserRow from '../components/UserRow'
import APIService from '../services/APIService'
import IUser from '../types/IUser'

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
      <div className='w-full flex items-center flex-col mb-4'>
        <img className='w-3/4' src={logo} alt='Logo cat' />
        <h1 className='text-4xl font-bold text-slate-100'>
          Github User Search
        </h1>
      </div>
      {/* input container */}
      <div className='w-3/4 flex mb-4'>
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
        {users.map((user: IUser) => (
          <UserRow user={user} key={user.id} />
        ))}
      </div>
    </div>
  )
}

export default StartPage
