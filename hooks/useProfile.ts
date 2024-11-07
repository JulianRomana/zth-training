import { useContext } from 'react'
import { ProfileContext } from '@/contexts/ProfileContext/ProfileContext'

const useProfile = () => {
  const value = useContext(ProfileContext)

  return {
    profile: value?.profile,
    isLoadingProfile: value?.isLoadingProfile,
    getCurrentProfile: value?.getCurrentProfile,
  }
}

export { useProfile }
