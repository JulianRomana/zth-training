import { useRoute } from '@react-navigation/native'
import { SetWorkoutModal } from '@/components/modals/SetWorkoutModal/SetWorkoutModal'
import { WORKOUTS } from '@/constants/workouts'

/* https://github.com/expo/expo/issues/26922 */

const WorkoutModal = (props) => {
  const { params } = useRoute()
  console.log(params)
  return <SetWorkoutModal workout={params.workout as keyof typeof WORKOUTS} />
}

export default WorkoutModal
