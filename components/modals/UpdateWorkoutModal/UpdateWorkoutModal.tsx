import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Surface, Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { cloneDeep, set } from 'lodash-es'
import { useRouter } from 'expo-router'
import { COLORS } from '@/constants/colors'
import { getCurrentDay } from '@/lib/date-fns'

import { Exercices, WORKOUTS, WorkoutType } from '@/constants/workouts'
import { useWorkoutManager } from '@/hooks/useWorkoutManager'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginTop: 20,
    padding: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 20,
    width: 40,
    margin: 12,
    borderWidth: 0.2,
    borderColor: COLORS.primary,
    marginLeft: 'auto',
    padding: 10,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  separator: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 6,
  },
  weightAnnotation: {
    color: COLORS.secondary,
  },
})

interface UpdateWorkoutModalProps {
  workoutId: string
}

const UpdateWorkoutModal = ({ workoutId }: UpdateWorkoutModalProps) => {
  const { date } = getCurrentDay()
  const { getWorkoutById, updateWorkout } = useWorkoutManager()
  const savedWorkout = getWorkoutById(workoutId)!

  const initWorkout = (workoutType: WorkoutType) => {
    const workoutTemplate = cloneDeep(WORKOUTS[workoutType])
    const updatedExercices = Object.entries(workoutTemplate.exercices).reduce(
      (acc, [exerciceTitle, exerciceInformations]) => ({
        ...acc,
        [exerciceTitle]: {
          ...exerciceInformations,
          ...savedWorkout.exercices[exerciceTitle],
        },
      }),
      {} as Exercices
    )
    return { title: workoutTemplate.title, exercices: updatedExercices }
  }
  const [workout, setWorkout] = useState(initWorkout(savedWorkout.title))

  const workoutEntries = Object.entries(workout?.exercices)

  const setInputValue = (value: string, path: string) => {
    setWorkout((oldVal) => set({ ...oldVal }, `exercices.${path}`, value))

    updateWorkout(savedWorkout, path, value)
  }

  const { back } = useRouter()

  const saveWorkout = back

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineLarge">{workout?.title}</Text>
      <Text variant="bodyLarge">{date}</Text>
      <ScrollView>
        {workoutEntries?.map(([exerciceNumber, exerciceInformations]) => (
          <Surface style={styles.card} elevation={2} key={exerciceNumber}>
            <Text variant="headlineSmall">{exerciceInformations.name}</Text>
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Poid</Text>
              <TextInput
                value={exerciceInformations.weight}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setInputValue(value, `${exerciceNumber}.weight`)
                }
                style={styles.input}
              />
              <Text variant="bodyLarge">kg</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Série 1</Text>
              <TextInput
                value={exerciceInformations.firstSet}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setInputValue(value, `${exerciceNumber}.firstSet`)
                }
                style={styles.input}
              />
              <Text variant="bodyLarge">{exerciceInformations.reps[0]}</Text>
              <Text variant="bodySmall" style={styles.weightAnnotation}>
                ({exerciceInformations.weight}kg)
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Série 2</Text>
              <TextInput
                value={exerciceInformations.secondSet}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setInputValue(value, `${exerciceNumber}.secondSet`)
                }
                style={styles.input}
              />
              <Text variant="bodyLarge">{exerciceInformations.reps[1]}</Text>
              <Text variant="bodySmall" style={styles.weightAnnotation}>
                ({exerciceInformations.weight}kg)
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Série 3</Text>
              <TextInput
                value={exerciceInformations.thirdSet}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setInputValue(value, `${exerciceNumber}.thirdSet`)
                }
                style={styles.input}
              />
              <Text variant="bodyLarge">{exerciceInformations.reps[2]}</Text>
              <Text variant="bodySmall" style={styles.weightAnnotation}>
                ({exerciceInformations.weight}kg)
              </Text>
            </View>
          </Surface>
        ))}
      </ScrollView>

      <Button
        mode="contained"
        textColor={COLORS.secondary}
        style={styles.button}
        onPress={saveWorkout}
      >
        Enregistrer mes perfs
      </Button>
    </View>
  )
}

export { UpdateWorkoutModal }
