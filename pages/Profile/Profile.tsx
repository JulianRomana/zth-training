import { useRouter } from 'expo-router'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Icon, IconButton, Text } from 'react-native-paper'
import { setMilliseconds, setHours } from 'date-fns'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useProfileManager } from '@/hooks/useProfileManager'
import { useProfile } from '@/hooks/useProfile'
import ChooseWorkoutDay from '@/components/ChooseWorkoutDay'
import { COLORS } from '@/constants/colors'
import { useWorkoutManager } from '@/hooks/useWorkoutManager'

const styles = StyleSheet.create({
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  timeButton: {
    marginTop: 8,
  },
  workouts: {
    marginTop: 32,
    marginBottom: 26,
  },
  nbOfWorkouts: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginTop: 18,
    borderRadius: 8,
    gap: 5,
    paddingVertical: 8,
  },
  textBlack: {
    color: 'black',
  },
  mealTimeContainer: {
    marginTop: 32,
  },
})

const Profile = () => {
  const { updateProfileWorkoutDay, updateProfileMealTime } = useProfileManager()
  const { workouts } = useWorkoutManager()
  const { profile } = useProfile()
  const { back } = useRouter()

  const onTimeChange = (_: DateTimePickerEvent | null, selectedDate?: Date) => {
    if (!selectedDate) return

    updateProfileMealTime(selectedDate)
  }

  const setDefaultTime = () => {
    onTimeChange(null, setMilliseconds(setHours(new Date(), 14), 0))
  }

  return (
    <ScrollView>
      <IconButton icon="arrow-left" onPress={back} />
      <View style={styles.name}>
        <Icon source="account-circle" size={48} color={COLORS.primary} />
        <Text variant="headlineLarge">{profile?.name}</Text>
      </View>
      <View style={styles.nbOfWorkouts}>
        <Icon source="star-outline" size={32} color="black" />
        <Text variant="bodyLarge" style={styles.textBlack}>
          {workouts.length}
        </Text>
        <Text variant="bodyLarge" style={styles.textBlack}>
          Séances faites
        </Text>
      </View>
      <Text variant="headlineMedium" style={styles.workouts}>
        Mes séances prévues
      </Text>

      <ChooseWorkoutDay updateProfileWorkoutDay={updateProfileWorkoutDay} />
      <View style={styles.mealTimeContainer}>
        <Text variant="headlineMedium">Heure du premier repas</Text>
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
            textColor="white"
          />
        )}
      </View>
    </ScrollView>
  )
}

export { Profile }
