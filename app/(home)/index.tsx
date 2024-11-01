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
import { formatStandardDateFormat, getCurrentDay } from '@/lib/date-fns'
import { WorkoutType } from '@/constants/workouts'
import { useWorkoutManager } from '@/hooks/useWorkoutManager'

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

const LOGO_MAPPER = {
  [WorkoutType.UPPER_A]: require('@/assets/images/upper1.png'),
  [WorkoutType.UPPER_B]: require('@/assets/images/upper1.png'),
  [WorkoutType.LOWER]: require('@/assets/images/lower.png'),
}

const Home = () => {
  const { push } = useRouter()
  const { workouts, getWorkoutById } = useWorkoutManager()

  const openExistingWorkoutModal = (workoutId: string) => {
    getWorkoutById(workoutId)
    push({
      pathname: '/(home)/modal',
      params: {
        workoutId,
      },
    })
  }

  const openNewWorkoutModal = (workoutType: WorkoutType) =>
    push({
      pathname: '/(home)/modal',
      params: {
        workoutType,
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
          <Pressable onPress={() => openNewWorkoutModal(WorkoutType.UPPER_A)}>
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
                  onPress={() => openNewWorkoutModal(WorkoutType.UPPER_A)}
                >
                  Noter mes perfs
                </Button>
              </View>
            </Surface>
          </Pressable>
        </View>
        <View style={styles.currentDayWorkout}>
          <Text variant="headlineMedium">Séances passées</Text>
          {workouts.map(({ title, createdAt, _id }) => (
            <Pressable
              onPress={() => openExistingWorkoutModal(_id.toString())}
              key={_id.toString()}
            >
              <Surface style={styles.workoutCard} elevation={1}>
                <Image style={styles.workoutLogo} source={LOGO_MAPPER[title]} />
                <View>
                  <Text variant="headlineLarge">{title}</Text>
                  <Text variant="bodyLarge">
                    {formatStandardDateFormat(createdAt)}
                  </Text>
                  <Button
                    mode="contained"
                    textColor={COLORS.secondary}
                    onPress={() => openExistingWorkoutModal(_id.toString())}
                    style={styles.workoutCta}
                  >
                    Voir mes perfs
                  </Button>
                </View>
              </Surface>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
