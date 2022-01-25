import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import APIService from '../services/APIService'
import IRepo from '../types/IRepo'
import IUserInfo from '../types/IUserInfo'
import {
  CogIcon,
  ExclamationCircleIcon,
  LocationMarkerIcon,
  LinkIcon,
  OfficeBuildingIcon,
  ChatAltIcon
} from '@heroicons/react/outline'

function UserPage() {
  const [user, setUser] = useState<IUserInfo | undefined>(undefined)
  const [repos, setRepos] = useState([])
  const { username } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return
      //const [response, error]: any = await APIService.findByUsername(username)
      const values = await Promise.all([
        APIService.findByUsername(username),
        APIService.findAllReposByUser(username)
      ])
      if (
        values[0][1] ||
        values[1][1] ||
        values[0][0] == null ||
        values[1][0] == null
      ) {
        const error = values[0][1] || values[1][1]
        console.log(error)
        return
      }
      setUser(values[0][0].data)
      setRepos(values[1][0].data)
    }

    /* /users/{username}/repos */
    fetchData()
  }, [])

  return (
    <div className='w-full container mx-auto h-full flex flex-col items-center'>
      {/* header */}
      <div className='w-full border-b-2 border-gray-700 flex py-3'>
        <p className='text-2xl text-slate-200 w-1/3'>Profile</p>
        <p className='text-2xl text-slate-200 w-2/3'>Repositories</p>
      </div>
      {/* container */}
      <div className='w-full flex py-3'>
        {/* left - profile */}
        <div className='w-1/3 flex flex-col'>
          <img className='rounded-full w-4/5' src={user?.avatar_url} />
          <p className='text-xl text-slate-400 font-semibold'>{user?.name}</p>
          <p className='text-xl text-slate-500'>{user?.login}</p>
          <p className='text-slate-400 mb-3'>{user?.bio}</p>
          <a className='button rounded-sm bg-gray-800 hover:bg-gray-700 text-slate-400 px-2 py-1 text-xs border border-slate-600 mb-3 w-max' href={user?.html_url} target="_blank" rel="noreferrer">Github Profile</a>
          <div className='flex items-center mb-1'>
            <OfficeBuildingIcon className='h-4 w-4 mr-1' />
            <p className='text-xs text-slate-400'>{user?.company}Company</p>
          </div>
          <div className='flex items-center mb-1'>
            <LocationMarkerIcon className='h-4 w-4 mr-1' />
            <p className='text-xs text-slate-400'>{user?.location}</p>
          </div>
          <div className='flex items-center mb-1'>
            <LinkIcon className='h-4 w-4 mr-1' />
            <p className='text-xs text-slate-400'>{user?.blog} https://google.com</p>
          </div>
          <div className='flex items-center mb-1'>
            <ChatAltIcon className='h-4 w-4 mr-1' />
            <p className='text-xs text-slate-400'>{user?.twitter_username}Twitter username</p>
          </div>
        </div>

        {/* right - repos */}
        <div className='w-2/3 flex flex-col'>
          {repos.map((repo: IRepo) => {
            return (
              <div
                key={repo?.html_url}
                className='flex flex-col px-3 py-4 border-b border-gray-700'>
                <div className='flex justify-between mb-1'>
                  <a
                    href={repo?.html_url}
                    target='_blank'
                    className='text-slate-300 hover:text-slate-200 font-bold'
                    rel='noreferrer'>
                    {repo?.name}
                  </a>
                  <span className='px-2 flex justify-center items-center text-xs rounded-full bg-green-100 text-green-800'>
                    {repo.license ? `${repo.license.name}` : 'none'}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <div className='flex'>
                    {repo.language && (
                      <div className='flex mr-3 items-center'>
                        <CogIcon className='h-4 w-4 text-slate-500 mr-1' />
                        <p className='text-xs text-slate-300'>
                          {repo?.language}
                        </p>
                      </div>
                    )}
                    <div className='flex mr-3 items-center'>
                      <ExclamationCircleIcon className='text-yellow-600 h-4 w-4 mr-1' />
                      <p className='text-xs text-slate-300'>
                        {repo?.open_issues}
                      </p>
                    </div>
                  </div>
                  <p className='text-xs text-slate-300'>
                    Updated {repo?.updated_at.slice(0, 10)}
                  </p>
                </div>
              </div>
            )
          })}
          {/* repo - row */}
          {/* name */}
          {/* language */}
          {/* issues */}
          {/* license */}
          {/* updated at */}
        </div>
      </div>
    </div>
  )
}

export default UserPage
