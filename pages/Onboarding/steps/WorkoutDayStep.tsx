import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import ChooseWorkoutDay from '@/components/ChooseWorkoutDay'
import { useProfileManager } from '@/hooks/useProfileManager'

interface WorkoutDayStepProps {
  setNextStep: (nextStep: 'FirstMealStep') => void
}

const WorkoutDayStep = ({ setNextStep }: WorkoutDayStepProps) => {
  const { updateProfileWorkoutDay } = useProfileManager()
  return (
    <View>
      <Text>Workout Day Step</Text>
      <ChooseWorkoutDay updateProfileWorkoutDay={updateProfileWorkoutDay} />
      <Button mode="contained" onPress={() => setNextStep('FirstMealStep')}>
        Next
      </Button>
    </View>
  )
}

export { WorkoutDayStep }
