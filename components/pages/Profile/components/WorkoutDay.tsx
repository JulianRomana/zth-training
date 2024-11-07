import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Menu, Text } from 'react-native-paper'

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  workoutDayWrapper: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 'auto',
  },
})

interface WorkoutDayProps {
  workoutName: string
  activeWorkout: string
  setWorkout: (workoutDay: number) => void
}

const days = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
] as const

const WorkoutDay = ({
  workoutName,
  activeWorkout,
  setWorkout,
}: WorkoutDayProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  return (
    <View style={styles.workoutDayWrapper}>
      <Text variant="headlineMedium" style={styles.button}>
        {workoutName} {activeWorkout}
      </Text>
      <Menu
        visible={isMenuVisible}
        onDismiss={() => setIsMenuVisible(false)}
        anchor={
          <Button mode="contained" onPress={() => setIsMenuVisible(true)}>
            Show menu
          </Button>
        }
      >
        {days.map((workouTitle, index) => (
          <Menu.Item
            key={workouTitle}
            onPress={() => {
              setWorkout(index + 1)
              setIsMenuVisible(false)
            }}
            title={workouTitle}
          />
        ))}
      </Menu>
    </View>
  )
}

export { WorkoutDay }
