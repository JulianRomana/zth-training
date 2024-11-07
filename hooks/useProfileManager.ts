import { useRealm, Realm } from '@realm/react'
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
        AsyncStorage.setItem('hasDoneOnboarding', 'true')
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

  const updateWorkout = useCallback(
    (workout: Workout, path: string, val: string) => {
      realm.write(() => {
        const [workoutNumber, setNumber] = path.split('.') as [
          keyof Workout['exercices'],
          string,
        ]

        // eslint-disable-next-line no-param-reassign
        workout.exercices[workoutNumber][setNumber] = val
      })
    },
    [realm]
  )

  return { createProfile, getProfile }
}

export { useProfileManager }
