import React, { ChangeEvent, useState } from 'react'
import logo from '../assets/logo.png'

function StartPage() {
  const [username, setUsername] = useState<string>('')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleOnSubmit = () => {
    console.log('submit: ', username)
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
          className='w-1/4 items-center justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-green-600 custom-github-button hover:bg-green-500'
        >
          Search
        </button>
      </div>
      {/* result container */}
      {/* result row */}
      {/* result row avatar */}
      {/* result row username */}
      {/* result row type */}
    </div>
  )
}

export default StartPage
