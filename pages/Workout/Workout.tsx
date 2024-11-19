import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { CreateWorkoutModal } from './components/CreateWorkout'
import { UpdateWorkoutModal } from './components/UpdateWorkout'

const Workout = () => {
  const params = useLocalSearchParams<{
    workoutId?: string
  }>()
  const [workoutId, setWorkoutId] = useState<string | undefined>(
    params?.workoutId
  )

  return workoutId ? (
    <UpdateWorkoutModal workoutId={workoutId} />
  ) : (
    <CreateWorkoutModal setWorkoutId={setWorkoutId} />
  )
}

export { Workout }
