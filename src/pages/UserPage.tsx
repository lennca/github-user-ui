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
    <div className='container flex flex-col items-center w-full h-full px-3 mx-auto'>
      <div className='hidden w-full py-4 border-b border-grey-6 sm:flex'>
        <p className='h1 !font-normal w-1/3'>Profile</p>
        <p className='h1 !font-normal w-2/3'>Repositories [{repos.length}]</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col w-full sm:flex-row'>
          <div className='flex flex-col w-full space-y-3 sm:w-1/3'>
            <p className='h1 !font-normal border-b border-grey-6 py-4 sm:hidden'>Profile</p>

            <div className='flex sm:flex-col'>
              <img className='w-1/5 mb-3 mr-3 rounded-full sm:w-4/5 sm:mr-0' src={user?.avatar_url} />
              <div className='flex flex-col justify-center flex-1'>
                <p className='text-xl font-semibold lg:text-3xl'>{user?.name}</p>
                <p className='text-xl text-grey-2'>{user?.login}</p>
              </div>
            </div>

            <a className='btn-grey' href={user?.html_url} target='_blank' rel='noreferrer'>
              Github Profile
            </a>

            <div id='info-container'>
              <InfoRow text={user?.company} Element={OfficeBuildingIcon} isLink={false} />
              <InfoRow text={user?.location} Element={LocationMarkerIcon} isLink={false} />
              <InfoRow text={user?.blog} Element={LinkIcon} isLink />
              <InfoRow text={user?.twitter_username} Element={ChatAltIcon} isLink />
            </div>
          </div>

          <div className='flex flex-col w-full sm:w-2/3'>
            <p className='h1 !font-normal border-b border-grey-6 py-4 mb-3 sm:hidden'>Repositories [{repos.length}]</p>

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
