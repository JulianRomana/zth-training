import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { WorkoutType } from '@/constants/workouts'
import { COLORS } from '@/constants/colors'

interface WorkoutCardProps {
  type: WorkoutType
  ctaText: string
  onPress: () => void
  // Will be deprecated with the Component.DefaultProps syntax
  // eslint-disable-next-line react/require-default-props
  date?: string
}

const styles = StyleSheet.create({
  workoutCard: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 14,
    marginTop: 20,
  },
  workoutLogo: {
    width: 120,
    height: 140,
    marginEnd: 10,
  },
  workoutCta: {
    marginTop: 'auto',
  },
})

const LOGO_MAPPER = {
  [WorkoutType.UPPER_A]: require('@/assets/images/upper1.png'),
  [WorkoutType.UPPER_B]: require('@/assets/images/upper1.png'),
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
  ctaText,
  date = '',
}: WorkoutCardProps) => {
  const image = LOGO_MAPPER[type]
  return (
    <Pressable onPress={onPress}>
      <Surface style={styles.workoutCard} elevation={2}>
        <Image style={styles.workoutLogo} source={image} />
        <View>
          <Text variant="headlineLarge">{TYPE_TITLE_MAPPER[type]}</Text>
          <Text variant="bodyLarge">{date}</Text>
          <Button
            mode="contained"
            textColor={COLORS.secondary}
            style={styles.workoutCta}
            onPress={onPress}
          >
            {ctaText}
          </Button>
        </View>
      </Surface>
    </Pressable>
  )
}

export { WorkoutCard }
