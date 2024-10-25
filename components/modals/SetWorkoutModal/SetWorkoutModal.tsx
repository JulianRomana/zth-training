import { StyleSheet, View, ScrollView, TextInput } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { useState } from 'react'
import { COLORS } from '@/constants/colors'
import { getCurrentDay } from '@/lib/date-fns'

import { WORKOUTS } from '@/constants/workouts'

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
    height: 40,
    width: 40,
    margin: 12,
    borderWidth: 1,
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

interface SetWorkoutModalProps {
  workout: keyof typeof WORKOUTS
}

const SetWorkoutModal = ({ workout }: SetWorkoutModalProps) => {
  const { date } = getCurrentDay()
  const [weight, setWeight] = useState('')
  const [firstSet, setFirstSet] = useState('')
  const [secondSet, setSecondSet] = useState('')
  const [thirdSet, setThirdSet] = useState('')
  const { title, exercices } = WORKOUTS[workout]

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineLarge">{title}</Text>
      <Text variant="bodyLarge">{date}</Text>
      <ScrollView>
        {exercices.map(({ name, sets }, index) => (
          <Surface style={styles.card} elevation={2} key={`${name}-${index}`}>
            <Text variant="headlineSmall">{name}</Text>
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Poid</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                style={styles.input}
              />
              <Text variant="bodyLarge">kg</Text>
            </View>
            <View style={styles.separator} />
            {sets.map((reps, index) => (
              <View style={styles.inputWrapper}>
                <Text variant="bodyLarge">Série {index + 1}</Text>
                <TextInput
                  value={firstSet}
                  onBlur={() => setFirstSet(firstSet)}
                  style={styles.input}
                />
                <Text variant="bodyLarge">{reps} </Text>
                <Text variant="bodySmall" style={styles.weightAnnotation}>
                  ({weight}kg)
                </Text>
              </View>
            ))}
          </Surface>
        ))}
      </ScrollView>
      <Button
        mode="contained"
        textColor={COLORS.secondary}
        style={styles.button}
      >
        Sauvgarder mes perfs
      </Button>
    </View>
  )
}

export { SetWorkoutModal }
