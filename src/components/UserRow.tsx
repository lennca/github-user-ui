import React from 'react'
import { Link } from 'react-router-dom'
import IUser from '../types/IUser'

function UserRow({ user }: { user: IUser }) {
  const { id, avatar_url, login, type, html_url } = user
  return (
    <div key={id} className='flex items-center bg-slate-200 mb-2 rounded-md p-3'>
      <div className='flex-item mr-4'>
        <img className='h-10 w-10 rounded-full' src={avatar_url} alt='User avatar' />
      </div>
      <div className='mr-4 flex-item-20 '>
        <Link to={`/user/${login}`} className='text-sm font-medium text-gray-900'>
          {login}
        </Link>
      </div>
      <div className='mr-4 flex-item'>
        <p className='text-sm text-gray-500'>{type}</p>
      </div>
      <div className='mr-4 flex-item-20 text-right'>
        <a
          target='_blank'
          rel='noreferrer'
          href={html_url}
          className='text-sm font-medium text-indigo-600 hover:text-indigo-900'>
          Github Profile
        </a>
      </div>
    </div>
  )
}

export default UserRow
