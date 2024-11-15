/* eslint-disable react/require-default-props */
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { WorkoutType } from '@/constants/workouts'

interface WorkoutCardProps {
  type: WorkoutType
  onPress: () => void
  // Will be deprecated with the Component.DefaultProps syntax

  small?: boolean
  date?: string
}

const styles = StyleSheet.create({
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 12,
  },
  workoutLogo: {
    width: 140,
    height: 140,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutLogoSmall: {
    width: 42,
    height: 42,
    marginRight: 12,
  },
  workoutTitle: {
    fontSize: 26,
  },
})

const LOGO_MAPPER = {
  [WorkoutType.UPPER_A]: require('@/assets/images/uppera.png'),
  [WorkoutType.UPPER_B]: require('@/assets/images/upperb.png'),
  [WorkoutType.LOWER]: require('@/assets/images/lower.png'),
}

const TYPE_TITLE_MAPPER = {
  [WorkoutType.UPPER_A]: 'Upper A',
  [WorkoutType.UPPER_B]: 'Upper B',
  [WorkoutType.LOWER]: 'Lower',
}

const WorkoutCard = ({
  type,
  onPress,
  date = '',
  small = false,
}: WorkoutCardProps) => {
  const image = LOGO_MAPPER[type]
  return (
    <Pressable onPress={onPress}>
      <Surface style={[styles.workoutCard]} elevation={2}>
        {small ? (
          <>
            <View style={styles.wrapper}>
              <Image
                style={[styles.workoutLogo, small && styles.workoutLogoSmall]}
                source={image}
              />
              <Text variant="bodyLarge">{TYPE_TITLE_MAPPER[type]}</Text>
            </View>
            <Text variant="bodySmall">{date}</Text>
          </>
        ) : (
          <>
            <Text variant="bodyLarge" style={styles.workoutTitle}>
              {TYPE_TITLE_MAPPER[type]}
            </Text>
            <Image style={styles.workoutLogo} source={image} />
          </>
        )}
      </Surface>
    </Pressable>
  )
}

export { WorkoutCard }
