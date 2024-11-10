import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { setMilliseconds, setHours } from 'date-fns'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useProfileManager } from '@/hooks/useProfileManager'
import { useProfile } from '@/hooks/useProfile'
import ChooseWorkoutDay from '@/components/ChooseWorkoutDay'

const styles = StyleSheet.create({
  mealTimeContainer: {
    marginVertical: 16,
  },
  timeButton: {
    marginTop: 8,
  },
  workouts: {
    marginTop: 20,
    marginBottom: 10,
  },
})

const Profile = () => {
  const { updateProfileWorkoutDay, updateProfileMealTime } = useProfileManager()
  const { profile } = useProfile()

  const onTimeChange = (_: DateTimePickerEvent | null, selectedDate?: Date) => {
    if (!selectedDate) return

    updateProfileMealTime(selectedDate)
  }

  const setDefaultTime = () => {
    onTimeChange(null, setMilliseconds(setHours(new Date(), 14), 0))
  }

  return (
    <View>
      <Text variant="headlineLarge">{profile?.name}</Text>
      <Text variant="headlineMedium" style={styles.workouts}>
        Jours des séances
      </Text>

      <ChooseWorkoutDay updateProfileWorkoutDay={updateProfileWorkoutDay} />
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
