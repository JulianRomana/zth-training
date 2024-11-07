// src/contexts/AuthContext/AuthContext.js
import { createContext, ReactNode, useMemo } from 'react'
import { useProfileManager } from '@/hooks/useProfileManager'
import { Profile } from '@/models/Profile'

interface ProfileContext {
  profile: Profile | undefined
}

export const ProfileContext = createContext<ProfileContext>({
  profile: undefined,
})

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { profile } = useProfileManager()

  const value = useMemo(() => ({ profile }), [profile])

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
