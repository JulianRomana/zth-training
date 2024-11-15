/* https://github.com/realm/realm-js/blob/main/examples/rn-todo-list/frontend/app/hooks/useTaskManager.ts */

import { useQuery, useRealm, Realm } from '@realm/react'
import { useCallback } from 'react'
import { Workout } from '@/models/Workout'

const useWorkoutManager = () => {
  const realm = useRealm()
  const workouts = useQuery({
    type: Workout,
    query: (queriedWorkout) => queriedWorkout.sorted('createdAt', true),
  })

  const createWorkout = useCallback(
    ({ exercices, title }: Parameters<(typeof Workout)['generate']>[0]) =>
      realm.write(() => {
        const { _id } = realm.create(
          'Workout',
          Workout.generate({
            title,
            exercices,
          })
        )
        return _id
      }),
    [realm]
  )

  const getWorkoutById = useCallback(
    (id: string) =>
      realm.objectForPrimaryKey<Workout>(
        'Workout',
        new Realm.BSON.ObjectId(id)
      ),
    [realm]
  )

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

  return { createWorkout, workouts, getWorkoutById, updateWorkout }
}

export { useWorkoutManager }
