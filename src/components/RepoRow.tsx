import React from 'react'
import IRepo from '../types/IRepo'
import { CogIcon, ExclamationCircleIcon } from '@heroicons/react/outline'

function RepoRow({ repo }: { repo: IRepo }) {
  const { html_url, name, license, language, open_issues, updated_at } = repo

  return (
    <div
      key={html_url}
      className='flex flex-col px-3 py-4 border-b border-github-border'>
      <div className='flex justify-between mb-1'>
        <a
          href={html_url}
          target='_blank'
          className='text-github-secondary hover:text-github-primary font-bold text-lg'
          rel='noreferrer'>
          {name}
        </a>
        <span className='px-2 flex justify-center items-center text-xs rounded-full bg-green-100 text-green-800'>
          {license ? `${license.name}` : 'none'}
        </span>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex'>
          {language && (
            <div className='flex mr-3 items-center'>
              <CogIcon className='h-4 w-4 text-slate-500 mr-1' />
              <p className='text-xs text-github-secondary'>{language}</p>
            </div>
          )}
          <div className='flex mr-3 items-center'>
            <ExclamationCircleIcon className='text-yellow-600 h-4 w-4 mr-1' />
            <p className='text-xs text-github-secondary'>{open_issues}</p>
          </div>
        </div>
        <p className='text-xs text-github-secondary'>
          Updated {updated_at.slice(0, 10)}
        </p>
      </div>
    </div>
  )
}

export default RepoRow
