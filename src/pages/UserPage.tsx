import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRepo from '../types/IRepo'
import IUserInfo from '../types/IUserInfo'
import { LocationMarkerIcon, LinkIcon, OfficeBuildingIcon, ChatAltIcon } from '@heroicons/react/outline'
import RepoRow from '../components/RepoRow'
import InfoRow from '../components/InfoRow'
import Spinner from '../components/Spinner'
import HttpService from '../services/HttpService'

function UserPage() {
  const [user, setUser] = useState<IUserInfo | undefined>(undefined)
  const [repos, setRepos] = useState<IRepo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { username } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return
      const values = await Promise.all([HttpService.findByUsername(username), HttpService.findAllReposByUser(username)])
      const [userRes, userError] = values[0]
      const [repoRes, repoError] = values[1]

      if (userError || repoError || !userRes || !repoRes) {
        const error = userError || repoError
        console.error(error)
        return
      }
      setUser(userRes)
      setRepos(repoRes)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className='w-full container mx-auto h-full flex flex-col items-center px-3'>
      <div className='w-full border-b border-grey-6 py-4 hidden sm:flex mb-3'>
        <p className='h1 !font-normal w-1/3'>Profile</p>
        <p className='h1 !font-normal w-2/3'>Repositories [{repos.length}]</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='w-full flex flex-col sm:flex-row'>
          <div className='w-full sm:w-1/3 flex flex-col'>
            <p className='h1 !font-normal border-b border-grey-6 py-4 sm:hidden mb-3'>Profile</p>

            <div className='flex sm:flex-col'>
              <img className='rounded-full w-1/5 sm:w-4/5 mb-3 mr-3 sm:mr-0' src={user?.avatar_url} />
              <div className='mb-3 flex flex-col justify-center flex-1'>
                <p className='text-xl lg:text-3xl font-semibold'>{user?.name}</p>
                <p className='text-xl text-grey-2'>{user?.login}</p>
              </div>
            </div>

            <a
              className='py-1 mb-3 github-btn-sec text-sm sm:w-3/4 text-center'
              href={user?.html_url}
              target='_blank'
              rel='noreferrer'>
              Github Profile
            </a>
            <InfoRow text={user?.company} Element={OfficeBuildingIcon} isLink={false} />
            <InfoRow text={user?.location} Element={LocationMarkerIcon} isLink={false} />
            <InfoRow text={user?.blog} Element={LinkIcon} isLink />
            <InfoRow text={user?.twitter_username} Element={ChatAltIcon} isLink />
          </div>

          <div className='w-full sm:w-2/3 flex flex-col'>
            <p className='h1 !font-normal border-b border-grey-6 py-4 sm:hidden mb-3'>
              Repositories [{repos.length}]
            </p>

            {repos.map((repo: IRepo) => (
              <RepoRow repo={repo} key={repo.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPage
