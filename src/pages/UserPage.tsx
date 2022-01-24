import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import APIService from '../services/APIService'
import IRepo from '../types/IRepo'
import IUserInfo from '../types/IUserInfo'

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
        APIService.findAllReposByUser(username),
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
        <div className='w-2/3 flex py-3'>
          {repos.map((repo: IRepo) => (
            <p key={repo.html_url}>{repo.html_url}</p>
          ))}
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
