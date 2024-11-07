import { Link } from 'expo-router'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { addDays, formatDate, startOfWeek } from 'date-fns'
import { isNull, isUndefined } from 'lodash-es'
import { useContext } from 'react'
import { WorkoutDay } from './components/WorkoutDay'
import { ProfileContext } from '@/contexts/ProfileContext/ProfileContext'

const Profile = () => {
  const { profile } = useContext(ProfileContext)

  const getWeekDay = (dayNumber: number | undefined) => {
    if (isNull(dayNumber) || isUndefined(dayNumber)) return 'Non définis'
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 }) // Sunday as 0
    const weekday = addDays(startDate, dayNumber)
    return formatDate(weekday, 'EEEE')
  }

  return (
    <View>
      <Text variant="headlineLarge">Profile</Text>
      <Text variant="headlineLarge">{profile?.name}</Text>
      <WorkoutDay
        workoutName="Upper A"
        activeWorkout={getWeekDay(profile?.upperADay)}
      />
      <WorkoutDay
        workoutName="Upper B"
        activeWorkout={getWeekDay(profile?.upperBDay)}
      />
      <WorkoutDay
        workoutName="Lower"
        activeWorkout={getWeekDay(profile?.lowerDay)}
      />
      <Link href="/(home)" asChild>
        <Button mode="contained">Go to main</Button>
      </Link>
    </View>
  )
}

export { Profile }
