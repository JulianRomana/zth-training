import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { Button, Text } from 'react-native-paper'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useProfileManager } from '@/hooks/useProfileManager'

const FirstMealStep = () => {
  const { push } = useRouter()
  const { profile, updateProfileMealTime } = useProfileManager()

  const onTimeChange = (_: DateTimePickerEvent | null, selectedDate?: Date) => {
    if (!selectedDate) return

    updateProfileMealTime(selectedDate)
  }
  const goHome = () => {
    push('/(app)/(home)')
  }

  return (
    <View>
      <Text>First Meal</Text>
      <DateTimePicker
        value={profile!.firstMealTime ?? new Date()}
        mode="time"
        is24Hour={true}
        display="spinner"
        onChange={onTimeChange}
      />
      <Button mode="contained" onPress={goHome}>
        Terminer
      </Button>
    </View>
  )
}
export { FirstMealStep }
