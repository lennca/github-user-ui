import React from 'react'
import { Link } from 'react-router-dom'
import IUser from '../types/IUser'
import { ExternalLinkIcon } from '@heroicons/react/outline'

function UserRow({ user }: { user: IUser }) {
  const { id, avatar_url, login, type, html_url } = user
  return (
    <div key={id} className='flex items-center border-btn mb-2 rounded-md p-3'>
      <div className='flex-1 mr-4'>
        <img className='h-10 w-10 rounded-full' src={avatar_url} alt='User avatar' />
      </div>
      <div className='mr-4 flex-20 '>
        <Link to={`/user/${login}`} className='font-medium text-white hover:underline'>
          {login}
        </Link>
      </div>
      <div className='mr-4 flex-item'>
        <p>{type}</p>
      </div>
      <div className='mr-4 flex-20 text-right flex justify-end'>
        <a
          target='_blank'
          rel='noreferrer'
          href={html_url}
          className='flex items-center text-blue-light hover:underline'>
          GitHub Profile
          <ExternalLinkIcon className='h-4 w-4' />
        </a>
      </div>
    </div>
  )
}

export default UserRow
