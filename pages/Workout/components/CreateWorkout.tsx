import { Dispatch } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import { cloneDeep } from 'lodash-es'
import { useRouter } from 'expo-router'
import { WORKOUTS, WorkoutType } from '@/constants/workouts'
import { useWorkoutManager } from '@/hooks/useWorkoutManager'
import { COLORS } from '@/constants/colors'

const LOGO_MAPPER = {
  [WorkoutType.UPPER_A]: require('@/assets/images/uppera.png'),
  [WorkoutType.UPPER_B]: require('@/assets/images/upperb.png'),
  [WorkoutType.LOWER]: require('@/assets/images/lower.png'),
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workoutTypeWrapper: {
    marginTop: 100,
  },
  workoutLine: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    marginBottom: 26,
  },
  image: { width: 60, height: 60, marginRight: 8 },
})

interface CreateWorkoutModalProps {
  setWorkoutId: Dispatch<string>
}

const CreateWorkoutModal = ({ setWorkoutId }: CreateWorkoutModalProps) => {
  const { createWorkout } = useWorkoutManager()
  const { back } = useRouter()
  const onChoosenWorkout = (workoutType: WorkoutType) => {
    const newWorkout = cloneDeep(WORKOUTS[workoutType])
    const workoutId = createWorkout({
      title: workoutType,
      exercices: newWorkout.exercices,
    })
    setWorkoutId(workoutId.toString())
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={back} />
        <Text variant="headlineLarge" style={styles.title}>
          Choisir {'\n'} une séance
        </Text>
        <IconButton icon="arrow-left" iconColor="black" />
      </View>
      <ScrollView>
        <View style={styles.workoutTypeWrapper}>
          {Object.values(WorkoutType).map((workoutType) => (
            <TouchableOpacity
              key={workoutType}
              style={styles.workoutLine}
              onPress={() => onChoosenWorkout(workoutType)}
            >
              <Image source={LOGO_MAPPER[workoutType]} style={styles.image} />
              <Text variant="bodyLarge">{workoutType}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export { CreateWorkoutModal }
