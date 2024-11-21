import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native'
import {
  Button,
  Divider,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper'
import { useState } from 'react'
import { cloneDeep, set } from 'lodash-es'
import { useRouter } from 'expo-router'
import { format } from 'date-fns'
import { COLORS } from '@/constants/colors'

import { Exercices, WORKOUTS, WorkoutType } from '@/constants/workouts'
import { useWorkoutManager } from '@/hooks/useWorkoutManager'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  date: {
    color: COLORS.grayLighter,
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollWrapper: {
    marginBottom: 40,
  },
  workoutExercicesWrapper: {},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginTop: 20,
    marginBottom: 60,
    backgroundColor: COLORS.primary,
  },
  exerciceTitleWrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  weightInput: {
    flex: 1,
    marginLeft: 'auto',
    maxWidth: 130,
  },
  rounded: {
    borderRadius: 8,
  },
  setExercicesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.primary,
  },
  inputAffixText: {
    fontSize: 12,
    color: COLORS.grayLighter,
  },
  button: {
    marginBottom: 20,
    marginTop: 10,
  },
})

interface UpdateWorkoutModalProps {
  workoutId: string
}

const UpdateWorkoutModal = ({ workoutId }: UpdateWorkoutModalProps) => {
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

  const roundWeight = (weight: number) => Math.round(weight * 2 + 0.1) / 2
  const updateWeightByFactor = (
    { weight, factor }: Exercices['first'],
    nbOfFactors: 1 | 2
  ) => {
    const weightToNumber = Number(weight)
    if (nbOfFactors === 2) return roundWeight(weightToNumber * factor * factor)
    return roundWeight(weightToNumber * factor)
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={back} />
        <Text variant="headlineLarge" style={styles.title}>
          {workout?.title}
        </Text>
        <IconButton icon="arrow-left" iconColor="black" />
      </View>
      <Text variant="bodyLarge" style={styles.date}>
        {format(savedWorkout.createdAt, 'dd/MM/yyyy')}
      </Text>

      <ScrollView style={styles.scrollWrapper}>
        {workoutEntries?.map(
          (
            [exerciceNumber, exerciceInformations]: [
              string,
              Exercices['first'],
            ],
            index
          ) => (
            <View key={exerciceNumber} style={styles.workoutExercicesWrapper}>
              {index !== 0 && <Divider style={styles.divider} />}
              <View style={styles.exerciceTitleWrapper}>
                <Text variant="headlineSmall">{exerciceInformations.name}</Text>
                <TextInput
                  value={exerciceInformations.weight}
                  maxLength={3}
                  style={styles.weightInput}
                  outlineStyle={styles.rounded}
                  label="Poids"
                  mode="outlined"
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setInputValue(value, `${exerciceNumber}.weight`)
                  }
                />
              </View>
              <View style={styles.setExercicesWrapper}>
                <TextInput
                  value={exerciceInformations.firstSet}
                  onChangeText={(value) =>
                    setInputValue(value, `${exerciceNumber}.firstSet`)
                  }
                  style={styles.input}
                  contentStyle={{ paddingRight: 0 }}
                  maxLength={2}
                  keyboardType="numeric"
                  right={
                    <TextInput.Affix
                      text={`/ ${exerciceInformations.reps[0]} (${exerciceInformations.weight} kg)`}
                      textStyle={styles.inputAffixText}
                    />
                  }
                  label="Set 1"
                  outlineStyle={styles.rounded}
                  mode="outlined"
                />
                <TextInput
                  value={exerciceInformations.secondSet}
                  onChangeText={(value) =>
                    setInputValue(value, `${exerciceNumber}.secondSet`)
                  }
                  keyboardType="numeric"
                  contentStyle={{ paddingRight: 0 }}
                  style={styles.input}
                  right={
                    <TextInput.Affix
                      text={`/ ${exerciceInformations.reps[1]} (${updateWeightByFactor(exerciceInformations, 1)} kg)`}
                      textStyle={styles.inputAffixText}
                    />
                  }
                  maxLength={2}
                  label="Set 2"
                  outlineStyle={styles.rounded}
                  mode="outlined"
                />
                <TextInput
                  style={styles.input}
                  right={
                    <TextInput.Affix
                      text={`/ ${exerciceInformations.reps[2]} (${updateWeightByFactor(exerciceInformations, 2)} kg)`}
                      textStyle={styles.inputAffixText}
                    />
                  }
                  value={exerciceInformations.thirdSet}
                  contentStyle={{ paddingRight: 0 }}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setInputValue(value, `${exerciceNumber}.thirdSet`)
                  }
                  maxLength={2}
                  label="Set 3"
                  outlineStyle={styles.rounded}
                  mode="outlined"
                />
              </View>
            </View>
          )
        )}
      </ScrollView>

      <Button
        mode="contained"
        textColor={COLORS.secondary}
        style={styles.button}
        onPress={saveWorkout}
      >
        Enregistrer mes perfs
      </Button>
    </SafeAreaView>
  )
}

export { UpdateWorkoutModal }
