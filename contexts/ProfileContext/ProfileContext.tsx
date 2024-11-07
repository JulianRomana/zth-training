// src/contexts/AuthContext/AuthContext.js
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'expo-router'
import { useProfileManager } from '@/hooks/useProfileManager'
import { Profile } from '@/models/Profile'

interface ProfileContext {
  profile: Profile | null
  isLoadingProfile: boolean
  getCurrentProfile: () => void
}

export const ProfileContext = createContext<ProfileContext>({
  profile: null,
  getCurrentProfile: () => {},
  isLoadingProfile: false,
})

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const { getProfile } = useProfileManager()
  const { push } = useRouter()

  const getCurrentProfile = useCallback(async () => {
    setIsLoadingProfile(true)
    const currentProfile = await getProfile()

    if (!currentProfile) {
      push('/onboarding')
      return
    }

    setProfile(currentProfile)
    setIsLoadingProfile(false)
  }, [push, getProfile])

  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const value = useMemo(
    () => ({ profile, isLoadingProfile, getCurrentProfile }),
    [profile, isLoadingProfile, getCurrentProfile]
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
