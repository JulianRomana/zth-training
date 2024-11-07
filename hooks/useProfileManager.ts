import { useRealm, Realm, useQuery } from '@realm/react'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Profile } from '@/models/Profile'

const useProfileManager = () => {
  const realm = useRealm()

  const createProfile = useCallback(
    ({ name }: Parameters<(typeof Profile)['generate']>[0]) => {
      realm.write(async () => {
        const { _id } = realm.create(
          'Profile',
          Profile.generate({
            name,
          })
        )
        AsyncStorage.setItem('currentProfileId', _id.toString())
      })
    },
    [realm]
  )

  const getProfile = useCallback(async () => {
    const id = await AsyncStorage.getItem('currentProfileId')

    if (!id) return

    const profileById = realm.objectForPrimaryKey<Profile>(
      'Profile',
      new Realm.BSON.ObjectId(id)
    )

    if (!profileById) return
    return profileById
  }, [realm])

  const profile = useQuery({
    type: Profile,
    query: (queriedProfiles) => queriedProfiles,
  }).find(
    async ({ _id }) =>
      _id.toString() === (await AsyncStorage.getItem('currentProfileId'))
  )

  const updateProfileWorkoutDay = useCallback(
    (key: 'lowerDay' | 'upperADay' | 'upperBDay', val: number) => {
      realm.write(() => {
        profile![key] = val
      })
    },
    [realm, profile]
  )

  return { createProfile, getProfile, updateProfileWorkoutDay, profile }
}

export { useProfileManager }
