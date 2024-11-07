import { useContext } from 'react'
import { ProfileContext } from '@/contexts/ProfileContext/ProfileContext'

const useProfile = () => {
  const value = useContext(ProfileContext)
  return value
}

export { useProfile }
