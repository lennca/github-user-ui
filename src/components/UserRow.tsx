import React from 'react'
import { Link } from 'react-router-dom'
import IUser from '../types/IUser'
import { ExternalLinkIcon } from '@heroicons/react/outline'

function UserRow({ user }: { user: IUser }) {
  const { id, avatar_url, login, type, html_url } = user
  return (
    <div
      key={id}
      className='flex items-center mb-2 rounded-md p-3 space-x-4 border border-solid border-grey-5 hover:border-grey-2'>
      <div className='flex-1'>
        <img className='h-10 w-10 rounded-full' src={avatar_url} alt='User avatar' />
      </div>
      <div className='flex-20 '>
        <Link to={`/user/${login}`} className='font-medium text-white hover:underline'>
          {login}
        </Link>
      </div>
      <div className='flex-1'>
        <p>{type}</p>
      </div>
      <div className='flex-20 text-right flex justify-end pr-4'>
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
