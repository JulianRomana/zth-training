import { Link, useRouter } from 'expo-router'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Pressable,
  ScrollView,
} from 'react-native'
import { Button, Text, IconButton, Surface } from 'react-native-paper'
import { COLORS } from '@/constants/colors'
import { getCurrentDay } from '@/lib/date-fns'
import { WorkoutTitle } from '@/constants/workouts'

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentDayWorkout: {
    marginTop: 50,
    marginBottom: 70,
  },
  workoutCard: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 14,
    marginTop: 20,
    /*     backgroundColor: COLORS.secondary,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3, */
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

const Home = () => {
  const { push } = useRouter()

  const openModal = (workoutTitle: WorkoutTitle) =>
    push({
      pathname: '/(home)/modal',
      params: {
        workoutTitle,
      },
    })

  const { weekDay, date } = getCurrentDay()

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Text variant="headlineLarge">{weekDay}</Text>
            <Link href="/(profile)" asChild>
              <IconButton icon="account" mode="contained" />
            </Link>
          </View>
          <Text variant="bodyLarge">{date}</Text>
        </View>
        <View style={styles.currentDayWorkout}>
          <Text variant="headlineMedium">Séance du jour</Text>
          <Pressable onPress={() => openModal(WorkoutTitle.UPPER_A)}>
            <Surface style={styles.workoutCard} elevation={2}>
              <Image
                style={styles.workoutLogo}
                source={require('@/assets/images/upper1.png')}
              />
              <View>
                <Text variant="headlineLarge">Upper 1</Text>
                <Button
                  mode="contained"
                  textColor={COLORS.secondary}
                  style={styles.workoutCta}
                  onPress={() => openModal(WorkoutTitle.UPPER_A)}
                >
                  Noter mes perfs
                </Button>
              </View>
            </Surface>
          </Pressable>
        </View>
        <View style={styles.currentDayWorkout}>
          <Text variant="headlineMedium">Séances passées</Text>
          <Pressable onPress={() => openModal(WorkoutTitle.LOWER)}>
            <Surface style={styles.workoutCard} elevation={1}>
              <Image
                style={styles.workoutLogo}
                source={require('@/assets/images/lower.png')}
              />
              <View>
                <Text variant="headlineLarge">Lower</Text>
                <Text variant="bodyLarge">12/12/2024</Text>
                <Button
                  mode="contained"
                  textColor={COLORS.secondary}
                  onPress={() => openModal(WorkoutTitle.LOWER)}
                  style={styles.workoutCta}
                >
                  Voir mes perfs
                </Button>
              </View>
            </Surface>
          </Pressable>
          <Pressable onPress={() => openModal(WorkoutTitle.UPPER_B)}>
            <Surface style={styles.workoutCard} elevation={1}>
              <Image
                style={styles.workoutLogo}
                source={require('@/assets/images/upper1.png')}
              />
              <View>
                <Text variant="headlineLarge">Upper B</Text>
                <Text variant="bodyLarge">01/12/2024</Text>
                <Button
                  mode="contained"
                  textColor={COLORS.secondary}
                  onPress={() => openModal(WorkoutTitle.UPPER_B)}
                  style={styles.workoutCta}
                >
                  Voir mes perfs
                </Button>
              </View>
            </Surface>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
