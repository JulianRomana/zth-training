import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { COLORS } from '@/constants/colors'

interface ChooseWorkoutCardProps {
  onPress: () => void
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
    marginTop: 50,
  },
})

const ChooseWorkoutCard = ({ onPress }: ChooseWorkoutCardProps) => (
  <Pressable onPress={onPress}>
    <Surface style={styles.workoutCard} elevation={2}>
      <View>
        <Text variant="headlineLarge">Aucun séance pour aujourd&apos;hui</Text>
        <Button
          mode="contained"
          textColor={COLORS.secondary}
          style={styles.workoutCta}
          onPress={onPress}
        >
          Choisir un workout pour aujourdhui
        </Button>
      </View>
    </Surface>
  </Pressable>
)

export default ChooseWorkoutCard
