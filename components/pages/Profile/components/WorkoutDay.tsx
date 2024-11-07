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
}

const WorkoutDay = ({ workoutName, activeWorkout }: WorkoutDayProps) => {
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
        <Menu.Item onPress={() => {}} title="Lundi" />
        <Menu.Item onPress={() => {}} title="Mardi" />
        <Menu.Item onPress={() => {}} title="Mercredi" />
        <Menu.Item onPress={() => {}} title="Jeudi" />
        <Menu.Item onPress={() => {}} title="Vendredi" />
        <Menu.Item onPress={() => {}} title="Samedi" />
        <Menu.Item onPress={() => {}} title="Dimanche" />
      </Menu>
    </View>
  )
}

export { WorkoutDay }
