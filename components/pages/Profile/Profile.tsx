import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'
import {
  addDays,
  formatDate,
  startOfWeek,
  setMilliseconds,
  setHours,
} from 'date-fns'
import { isNull, isUndefined } from 'lodash-es'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { WorkoutDay } from './components/WorkoutDay'
import { WorkoutType } from '@/constants/workouts'
import { useProfileManager } from '@/hooks/useProfileManager'
import { useProfile } from '@/hooks/useProfile'

const styles = StyleSheet.create({
  mealTimeContainer: {
    marginVertical: 16,
  },
  timeButton: {
    marginTop: 8,
  },
})

const Profile = () => {
  const { updateProfileWorkoutDay, updateProfileMealTime } = useProfileManager()
  const { profile } = useProfile()

  const WORKOUT_TYPE_KEY_MAPPER = {
    [WorkoutType.UPPER_A]: 'upperADay',
    [WorkoutType.UPPER_B]: 'upperBDay',
    [WorkoutType.LOWER]: 'lowerDay',
  } as const

  const setWorkout = (workoutType: WorkoutType, workoutDay: number) => {
    updateProfileWorkoutDay(WORKOUT_TYPE_KEY_MAPPER[workoutType], workoutDay)
  }

  const getWeekDay = (dayNumber: number | undefined | null) => {
    if (isNull(dayNumber) || isUndefined(dayNumber)) return 'Non définis'
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 }) // Sunday as 0
    const weekday = addDays(startDate, dayNumber)
    return formatDate(weekday, 'EEEE')
  }

  const onTimeChange = (_: DateTimePickerEvent | null, selectedDate?: Date) => {
    if (!selectedDate) return

    updateProfileMealTime(selectedDate)
  }

  const setDefaultTime = () => {
    onTimeChange(null, setMilliseconds(setHours(new Date(), 14), 0))
  }

  return (
    <View>
      <Text variant="headlineLarge">Profile</Text>
      <Text variant="headlineLarge">{profile?.name}</Text>
      <Text variant="headlineMedium">Jours des séances</Text>
      <WorkoutDay
        workoutName="Upper A"
        activeWorkout={getWeekDay(profile!.upperADay)}
        setWorkout={(workoutDay) => setWorkout(WorkoutType.UPPER_A, workoutDay)}
      />
      <WorkoutDay
        workoutName="Upper B"
        activeWorkout={getWeekDay(profile!.upperBDay)}
        setWorkout={(workoutDay) => setWorkout(WorkoutType.UPPER_B, workoutDay)}
      />
      <WorkoutDay
        workoutName="Lower"
        activeWorkout={getWeekDay(profile!.lowerDay)}
        setWorkout={(workoutDay) => setWorkout(WorkoutType.LOWER, workoutDay)}
      />

      <View style={styles.mealTimeContainer}>
        <Text variant="headlineMedium">Premier repas</Text>
        {!profile!.firstMealTime ? (
          <Button
            mode="outlined"
            onPress={setDefaultTime}
            style={styles.timeButton}
          >
            Ajouter l&apos;heure de mon premier repas
          </Button>
        ) : (
          <DateTimePicker
            value={profile!.firstMealTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onTimeChange}
          />
        )}
      </View>

      <Link href="/(home)" asChild>
        <Button mode="contained">Go to main</Button>
      </Link>
    </View>
  )
}

export { Profile }
