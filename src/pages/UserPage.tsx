import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import APIService from '../services/APIService'
import IUserInfo from '../types/IUserInfo'

function UserPage() {
  const [user, setUser] = useState<IUserInfo | undefined>(undefined)
  const { username } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return
      const [response, error]: any = await APIService.findByUsername(username)
      if (error) {
        console.log(error)
        return
      }
      setUser(response.data)
    }

    /* /users/{username}/repos */
    fetchData()
  }, [])

  return (
    <div className='w-full container mx-auto h-full flex flex-col items-center'>
      {/* header */}
      <div className='w-full border-b-1 flex py-3'>
        {/* header - profile */}
        <p className='text-2xl text-slate-200 w-1/3'>Profile</p>
        {/* header - repos */}
        <p className='text-2xl text-slate-200 w-2/3'>Repositories</p>
      </div>
      {/* container */}
      <div className='w-full flex py-3'>
        {/* left - profile */}
        <div className='w-1/3'>
          {/* profile - avatar */}
          <img src={user?.avatar_url} />
          {/* profile - fullname */}
          <p>{user?.name}</p>
          {/* profile - username */}
          <p>{user?.login}</p>
          {/* profile - bio */}
          <p>{user?.bio}</p>
          {/* profile - github profile btn */}
          <button>{user?.html_url}</button>
          {/* profile - company */}
          <p>{user?.company}</p>
          {/* profile - location */}
          <p>{user?.location}</p>
          {/* profile - website */}
          <p>{user?.blog}</p>
          {/* profile - twitter */}
          <p>{user?.twitter_username}</p>
        </div>

        {/* right - repos */}
        <div className='w-2/3 flex py-3'>
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
