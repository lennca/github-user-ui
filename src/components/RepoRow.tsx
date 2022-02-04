import React from 'react'

import { CogIcon, ExclamationCircleIcon } from '@heroicons/react/outline'

import IRepo from '../types/IRepo'

function RepoRow({ repo }: { repo: IRepo }) {
  const { html_url, name, license, language, open_issues, updated_at } = repo

  return (
    <div key={html_url} className='flex flex-col px-3 py-4 border-b border-grey-6'>
      <div className='flex justify-between mb-1'>
        <a
          href={html_url}
          target='_blank'
          className='text-lg font-bold text-blue-light hover:underline'
          rel='noreferrer'>
          {name}
        </a>
        <span className='flex items-center justify-center px-2 text-xs text-green-800 bg-green-100 rounded-full'>
          {license ? `${license.name}` : 'none'}
        </span>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex space-x-3'>
          {language && (
            <div className='flex items-center'>
              <CogIcon className='w-4 h-4 mr-1 text-slate-500' />
              <p className='text-xs text-grey-2'>{language}</p>
            </div>
          )}
          <div className='flex items-center'>
            <ExclamationCircleIcon className='w-4 h-4 mr-1 text-yellow-600' />
            <p className='text-xs text-grey-2'>{open_issues}</p>
          </div>
        </div>
        <p className='text-xs text-grey-2'>Updated {updated_at.slice(0, 10)}</p>
      </div>
    </div>
  )
}

export default RepoRow
