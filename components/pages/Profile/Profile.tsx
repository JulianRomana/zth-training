import { Link } from 'expo-router'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { addDays, formatDate, startOfWeek } from 'date-fns'
import { isNull, isUndefined } from 'lodash-es'
import { WorkoutDay } from './components/WorkoutDay'
import { WorkoutType } from '@/constants/workouts'
import { useProfileManager } from '@/hooks/useProfileManager'
import { useProfile } from '@/hooks/useProfile'

const Profile = () => {
  const getWeekDay = (dayNumber: number | undefined | null) => {
    if (isNull(dayNumber) || isUndefined(dayNumber)) return 'Non définis'
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 }) // Sunday as 0
    const weekday = addDays(startDate, dayNumber)
    return formatDate(weekday, 'EEEE')
  }

  const { updateProfileWorkoutDay } = useProfileManager()
  const { profile } = useProfile()

  const WORKOUT_TYPE_KEY_MAPPER = {
    [WorkoutType.UPPER_A]: 'upperADay',
    [WorkoutType.UPPER_B]: 'upperBDay',
    [WorkoutType.LOWER]: 'lowerDay',
  } as const

  const setWorkout = (workoutDay: number, workoutType: WorkoutType) => {
    console.log(workoutDay, workoutType)
    updateProfileWorkoutDay(WORKOUT_TYPE_KEY_MAPPER[workoutType], workoutDay)
  }

  return (
    <View>
      <Text variant="headlineLarge">Profile</Text>
      <Text variant="headlineLarge">{profile?.name}</Text>
      <WorkoutDay
        workoutName="Upper A"
        activeWorkout={getWeekDay(profile!.upperADay)}
        setWorkout={(workoutDay) => setWorkout(workoutDay, WorkoutType.UPPER_A)}
      />
      <WorkoutDay
        workoutName="Upper B"
        activeWorkout={getWeekDay(profile!.upperBDay)}
        setWorkout={(workoutDay) => setWorkout(workoutDay, WorkoutType.UPPER_B)}
      />
      <WorkoutDay
        workoutName="Lower"
        activeWorkout={getWeekDay(profile!.lowerDay)}
        setWorkout={(workoutDay) => setWorkout(workoutDay, WorkoutType.LOWER)}
      />
      <Link href="/(home)" asChild>
        <Button mode="contained">Go to main</Button>
      </Link>
    </View>
  )
}

export { Profile }
