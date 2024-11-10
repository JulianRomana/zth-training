import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { IconButton, Menu, Text } from 'react-native-paper'
import { DayOption } from '@/types'

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  workoutDayWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  changeWorkoutDayButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: 'auto',
    fontSize: 20,
  },
  disabledMenuItem: {
    opacity: 0.5,
  },
})

interface WorkoutDayProps {
  workoutName: string
  activeWorkout: string
  setWorkout: (workoutDay: number) => void
  dayList: DayOption[]
}

const WorkoutDay = ({
  workoutName,
  activeWorkout,
  setWorkout,
  dayList,
}: WorkoutDayProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  return (
    <View style={styles.workoutDayWrapper}>
      <Text variant="bodyLarge" style={styles.button}>
        {workoutName}:
      </Text>
      <Menu
        visible={isMenuVisible}
        onDismiss={() => setIsMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.changeWorkoutDayButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Text variant="bodyLarge">{activeWorkout}</Text>
            <IconButton icon={isMenuVisible ? 'chevron-up' : 'chevron-down'} />
          </TouchableOpacity>
        }
      >
        {dayList.map((day) => (
          <Menu.Item
            key={day.label}
            onPress={() => {
              if (!day.isDisabled) {
                setWorkout(day.id)
                setIsMenuVisible(false)
              }
            }}
            title={day.label}
            disabled={day.isDisabled}
            style={day.isDisabled ? styles.disabledMenuItem : undefined}
          />
        ))}
      </Menu>
    </View>
  )
}

export { WorkoutDay }
