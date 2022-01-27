import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import APIService from '../services/APIService'
import IRepo from '../types/IRepo'
import IUserInfo from '../types/IUserInfo'
import { LocationMarkerIcon, LinkIcon, OfficeBuildingIcon, ChatAltIcon } from '@heroicons/react/outline'
import RepoRow from '../components/RepoRow'
import InfoRow from '../components/InfoRow'

function UserPage() {
  const [user, setUser] = useState<IUserInfo | undefined>(undefined)
  const [repos, setRepos] = useState([])
  const { username } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return
      //const [response, error]: any = await APIService.findByUsername(username)
      const values = await Promise.all([APIService.findByUsername(username), APIService.findAllReposByUser(username)])
      if (values[0][1] || values[1][1] || values[0][0] == null || values[1][0] == null) {
        const error = values[0][1] || values[1][1]
        console.log(error)
        return
      }
      setUser(values[0][0].data)
      setRepos(values[1][0].data)
    }

    fetchData()
  }, [])

  return (
    <div className='w-full container mx-auto h-full flex flex-col items-center'>
      {/* header */}
      <div className='w-full border-b border-github-border flex py-4'>
        <p className='text-4xl text-github-primary w-1/3'>Profile</p>
        <p className='text-4xl text-github-primary w-2/3'>Repositories [{repos.length > 0 ? repos.length : ''}]</p>
      </div>
      {/* container */}
      <div className='w-full flex py-3'>
        {/* left - profile */}
        <div className='w-1/3 flex flex-col'>
          <img className='rounded-full w-4/5 mb-3' src={user?.avatar_url} />
          <div className='mb-3'>
            <p className='text-3xl text-github-primary font-semibold'>{user?.name}</p>
            <p className='text-xl text-github-secondary'>{user?.login}</p>
          </div>
          <p className='text-github-primary mb-3'>{user?.bio}</p>
          <a
            className='py-1 mb-3 github-btn-sec text-sm w-3/4 text-center'
            href={user?.html_url}
            target='_blank'
            rel='noreferrer'>
            Github Profile
          </a>
          <InfoRow text={user?.company || '-'} Element={OfficeBuildingIcon} link={false} />
          <InfoRow text={user?.location || '-'} Element={LocationMarkerIcon} link={false} />
          <InfoRow text={user?.blog || '-'} Element={LinkIcon} link={true} />
          <InfoRow text={user?.twitter_username || '-'} Element={ChatAltIcon} link={true} />
        </div>

        {/* right - repos */}
        <div className='w-2/3 flex flex-col'>
          {repos.map((repo: IRepo) => (
            <RepoRow repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserPage
