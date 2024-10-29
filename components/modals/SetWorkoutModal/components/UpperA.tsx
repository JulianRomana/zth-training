import React, { Dispatch } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Surface, Text, TextInput } from 'react-native-paper'
import { COLORS } from '@/constants/colors'

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

interface UpperAProps {
  workoutName: string
  date: string
  exercices: {
    name: string
    weight: string
    reps: string[]
    firstSet: string
    secondSet: string
    thirdSet: string
  }[]
  saveWorkout: () => void
}

const UpperA = ({ workoutName, exercices, saveWorkout, date }: UpperAProps) => (
  <View style={styles.wrapper}>
    <Text variant="headlineLarge">{workoutName}</Text>
    <Text variant="bodyLarge">{date}</Text>
    <ScrollView>
      {exercices.map(
        ({ name, weight, reps, firstSet, secondSet, thirdSet }) => (
          <Surface style={styles.card} elevation={2} key={name}>
            <Text variant="headlineSmall">{name}</Text>
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Poid</Text>
              <TextInput
                value={weight}
                keyboardType="numeric"
                onChangeText={setWeight}
                style={styles.input}
              />
              <Text variant="bodyLarge">kg</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Série 1</Text>
              <TextInput
                value={firstSet}
                keyboardType="numeric"
                onBlur={() => setFirstSet(firstSet)}
                style={styles.input}
              />
              <Text variant="bodyLarge">{reps[0]} </Text>
              <Text variant="bodySmall" style={styles.weightAnnotation}>
                ({weight}kg)
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Série 1</Text>
              <TextInput
                value={secondSet}
                keyboardType="numeric"
                onBlur={() => setSecondSet(firstSet)}
                style={styles.input}
              />
              <Text variant="bodyLarge">{reps[1]} </Text>
              <Text variant="bodySmall" style={styles.weightAnnotation}>
                ({weight}kg)
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text variant="bodyLarge">Série 2</Text>
              <TextInput
                value={thirdSet}
                keyboardType="numeric"
                onBlur={() => setThirdSet(firstSet)}
                style={styles.input}
              />
              <Text variant="bodyLarge">{reps[2]} </Text>
              <Text variant="bodySmall" style={styles.weightAnnotation}>
                ({weight}kg)
              </Text>
            </View>
          </Surface>
        )
      )}
    </ScrollView>
    <Button
      mode="contained"
      textColor={COLORS.secondary}
      style={styles.button}
      onPress={saveWorkout}
    >
      Sauvgarder mes perfs
    </Button>
  </View>
)

export { UpperA }
