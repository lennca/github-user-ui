import React from 'react'

import { ExternalLinkIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

import IUser from '../types/IUser'

function UserRow({ user }: { user: IUser }) {
  const { id, avatar_url, login, type, html_url } = user
  return (
    <div
      key={id}
      className='flex items-center p-3 mb-2 space-x-4 border border-solid rounded-md border-grey-5 hover:border-grey-2'>
      <div className='flex-1'>
        <img className='w-10 h-10 rounded-full' src={avatar_url} alt='User avatar' />
      </div>
      <div className='flex-20 '>
        <Link to={`/user/${login}`} className='font-medium text-white hover:underline'>
          {login}
        </Link>
      </div>
      <div className='flex-1'>
        <p>{type}</p>
      </div>
      <div className='flex justify-end pr-4 text-right flex-20'>
        <a
          target='_blank'
          rel='noreferrer'
          href={html_url}
          className='flex items-center text-blue-light hover:underline'>
          GitHub Profile
          <ExternalLinkIcon className='w-4 h-4' />
        </a>
      </div>
    </div>
  )
}

export default UserRow
