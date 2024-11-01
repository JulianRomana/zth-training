import { useLocalSearchParams } from 'expo-router'
import { CreateWorkoutModal } from '@/components/modals/CreateWorkoutModal/CreateWorkoutModal'
import { UpdateWorkoutModal } from '@/components/modals/UpdateWorkoutModal/UpdateWorkoutModal'
import { WorkoutType } from '@/constants/workouts'

/* https://github.com/expo/expo/issues/26922 */

const WorkoutModal = () => {
  const params = useLocalSearchParams()

  return params?.workoutId ? (
    <UpdateWorkoutModal workoutId={params?.workoutId as string} />
  ) : (
    <CreateWorkoutModal workoutType={params?.workoutType as WorkoutType} />
  )
}

export default WorkoutModal
