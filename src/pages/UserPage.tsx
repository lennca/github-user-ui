import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import APIService from '../services/APIService'
import IRepo from '../types/IRepo'
import IUserInfo from '../types/IUserInfo'
import { CogIcon, ExclamationCircleIcon } from '@heroicons/react/outline'

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
      <div className='w-full border-b-1 flex py-3'>
        <p className='text-2xl text-slate-200 w-1/3'>Profile</p>
        <p className='text-2xl text-slate-200 w-2/3'>Repositories</p>
      </div>
      {/* container */}
      <div className='w-full flex py-3'>
        {/* left - profile */}
        <div className='w-1/3'>
          <img src={user?.avatar_url} />
          <p>{user?.name}</p>
          <p>{user?.login}</p>
          <p>{user?.bio}</p>
          <button>{user?.html_url}</button>
          <p>{user?.company}</p>
          <p>{user?.location}</p>
          <p>{user?.blog}</p>
          <p>{user?.twitter_username}</p>
        </div>

        {/* right - repos */}
        <div className='w-2/3 flex flex-col'>
          {repos.map((repo: IRepo) => {
            return (
              <div
                key={repo?.html_url}
                className='flex flex-col mb-4 px-3 py-2 border-b border-gray-700'>
                <div className='flex justify-between mb-1'>
                  <a href={repo?.html_url} target="_blank"  className='text-slate-300' rel="noreferrer">{repo?.name}</a>
                  <span className="px-2 flex justify-center items-center text-xs rounded-full bg-green-100 text-green-800">
                    {repo.license ? `${repo.license.name}` : "none"}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <div className='flex'>
                    <div className='flex mr-3 items-center'>
                      <CogIcon className='h-4 w-4 text-slate-500 mr-1' />
                      <p className='text-xs text-slate-300'>{repo?.language}</p>
                    </div>
                    <div className='flex mr-3 items-center'>
                      <ExclamationCircleIcon className='text-yellow-600 h-4 w-4 mr-1' />
                      <p className='text-xs text-slate-300'>{repo?.open_issues}</p>
                    </div>
                  </div>
                  <p className='text-xs text-slate-300'>Update {repo?.updated_at.slice(0, 10)}</p>
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
