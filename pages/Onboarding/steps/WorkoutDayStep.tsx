import { StyleSheet, View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { useState } from 'react'
import { COLORS } from '@/constants/colors'
import { useProfileManager } from '@/hooks/useProfileManager'

interface WorkoutDayStepProps {
  setNextStep: (step: 'NameStep' | 'FirstMealStep') => void
}

const DAYS = [
  { letter: 'l', day: 'Lundi', isoDayNumber: 1 },
  { letter: 'm', day: 'Mardi', isoDayNumber: 2 },
  { letter: 'm', day: 'Mercredi', isoDayNumber: 3 },
  { letter: 'j', day: 'Jeudi', isoDayNumber: 4 },
  { letter: 'v', day: 'Vendredi', isoDayNumber: 5 },
  { letter: 's', day: 'Samedi', isoDayNumber: 6 },
  { letter: 'd', day: 'Dimanche', isoDayNumber: 7 },
]

const WORKOUTS = ['Upper A', 'Upper B', 'Lower'] as const
type WorkoutType = (typeof WORKOUTS)[number]

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  closeIcon: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    marginBottom: 48,
    textAlign: 'center',
    opacity: 0.8,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 54,
  },
  dayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: 'auto',
    marginBottom: 32,
  },
  skipButton: {
    marginBottom: 28,
    opacity: 0.7,
  },
  button: {
    paddingVertical: 4,
  },
})

const WorkoutDayStep = ({ setNextStep }: WorkoutDayStepProps) => {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0)
  const [selectedDays, setSelectedDays] = useState<
    Record<WorkoutType, number | null>
  >({
    'Upper A': null,
    'Upper B': null,
    Lower: null,
  })
  const { updateProfileWorkoutDay } = useProfileManager()

  const currentWorkout = WORKOUTS[currentWorkoutIndex]

  const handleDaySelect = (dayIndex: number) => {
    setSelectedDays((prev) => ({
      ...prev,
      [currentWorkout]: dayIndex,
    }))

    if (currentWorkoutIndex < WORKOUTS.length - 1) {
      setCurrentWorkoutIndex((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    // Update profile with all selected days
    updateProfileWorkoutDay('upperADay', selectedDays['Upper A']!)
    updateProfileWorkoutDay('upperBDay', selectedDays['Upper B']!)
    updateProfileWorkoutDay('lowerDay', selectedDays.Lower!)
    setNextStep('FirstMealStep')
  }

  const isDayDisabled = (dayIndex: number) =>
    Object.values(selectedDays).includes(dayIndex)

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineLarge" style={styles.title}>
        {currentWorkout}
      </Text>

      <Text variant="bodyLarge" style={styles.subtitle}>
        Note: Tu pourras toujours modifier les jours assignés à tes séances sur
        ton profil.
      </Text>

      <View style={styles.daysContainer}>
        {DAYS.map(({ letter, isoDayNumber }) => (
          <IconButton
            key={isoDayNumber}
            icon={`alpha-${letter}`}
            iconColor="black"
            containerColor={
              isDayDisabled(isoDayNumber) ? 'grey' : COLORS.primary
            }
            mode="contained"
            style={[
              isDayDisabled(isoDayNumber)
                ? { opacity: 0.9 }
                : {
                    backgroundColor: COLORS.primary,
                  },
            ]}
            disabled={isDayDisabled(isoDayNumber)}
            onPress={() => handleDaySelect(isoDayNumber)}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <Button
          mode="text"
          style={styles.skipButton}
          textColor="gray"
          onPress={() => setNextStep('FirstMealStep')}
        >
          Sauter
        </Button>
        <Button
          mode="outlined"
          onPress={handleNext}
          style={styles.button}
          textColor="white"
          disabled={Object.values(selectedDays).some((day) => day === null)}
        >
          Continuer
        </Button>
      </View>
    </View>
  )
}

export { WorkoutDayStep }
