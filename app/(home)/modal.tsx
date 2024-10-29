import { useRoute } from '@react-navigation/native'
import { SetWorkoutModal } from '@/components/modals/SetWorkoutModal/SetWorkoutModal'
import { WORKOUTS } from '@/constants/workouts'

/* https://github.com/expo/expo/issues/26922 */

const WorkoutModal = () => {
  const { params } = useRoute()

  return (
    <SetWorkoutModal
      workoutTitle={params.workoutTitle as keyof typeof WORKOUTS}
    />
  )
}

export default WorkoutModal
