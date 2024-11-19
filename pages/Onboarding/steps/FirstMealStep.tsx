import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Button, Text } from 'react-native-paper'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useProfileManager } from '@/hooks/useProfileManager'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 84,
    textAlign: 'center',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 32,
    paddingVertical: 4,
  },
})

const FirstMealStep = () => {
  const { push } = useRouter()
  const { profile, updateProfileMealTime } = useProfileManager()

  const onTimeChange = (_: DateTimePickerEvent | null, selectedDate?: Date) => {
    if (!selectedDate) return
    updateProfileMealTime(selectedDate)
  }

  const goHome = () => {
    push('/(app)')
  }

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineLarge" style={styles.title}>
        Premier Repas
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Note: Tu pourras toujours modifier l’heure du premier repas sur ton
        profil
      </Text>

      <DateTimePicker
        value={profile!.firstMealTime!}
        mode="time"
        is24Hour={true}
        display="spinner"
        onChange={onTimeChange}
        textColor="white"
      />

      <Button
        mode="outlined"
        onPress={goHome}
        style={styles.button}
        textColor="white"
      >
        Terminer
      </Button>
    </View>
  )
}

export { FirstMealStep }
