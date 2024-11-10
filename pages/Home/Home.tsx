import { Link, useRouter } from 'expo-router'
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { getDay, getISODay, startOfWeek } from 'date-fns'
import { formatStandardDateFormat, getCurrentDay } from '@/lib/date-fns'
import { WorkoutType } from '@/constants/workouts'
import { useWorkoutManager } from '@/hooks/useWorkoutManager'
import { WorkoutCard } from '@/components/WorkoutCard'
import { useProfile } from '@/hooks/useProfile'
import ChooseWorkoutCard from '@/components/ChooseWorkoutCard'

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
  chooseWorkoutCta: {
    marginTop: 70,
  },
})

const Home = () => {
  const { push } = useRouter()
  const { workouts, getWorkoutById } = useWorkoutManager()
  const { profile } = useProfile()
  const nowDayNumber = getISODay(new Date())

  const workoutDayMapper = [
    {
      type: WorkoutType.UPPER_A,
      day: profile?.upperADay,
    },
    {
      type: WorkoutType.UPPER_B,
      day: profile?.upperBDay,
    },
    {
      type: WorkoutType.LOWER,
      day: profile?.lowerDay,
    },
  ]

  const currentDayWorkout = workoutDayMapper.find(
    ({ day }) => day === nowDayNumber // @TODO mettre 1 min pour que ça match
  )

  const currentDayCreatedWorkout = workouts.find(
    ({ createdAt }) => getDay(createdAt) === nowDayNumber // @TODO mettre 1 min pour que ça match
  )

  const pastWorkouts = workouts.filter(
    ({ createdAt }) => getDay(createdAt) < nowDayNumber
  )

  const openExistingWorkoutModal = (workoutId: string) => {
    getWorkoutById(workoutId)
    push({
      pathname: '/(app)/workout-modal',
      params: {
        workoutId,
      },
    })
  }

  const openNewWorkoutModal = (workoutType?: WorkoutType) =>
    push({
      pathname: '/(app)/workout-modal',
      params: {
        workoutType,
      },
    })

  const { weekDay, date } = getCurrentDay()

  const getCurrentDayWorkout = () => {
    if (currentDayCreatedWorkout)
      return (
        <WorkoutCard
          onPress={() =>
            openExistingWorkoutModal(currentDayCreatedWorkout._id.toString())
          }
          type={currentDayCreatedWorkout.title}
          ctaText="Noter mes perfs"
        />
      )

    if (currentDayWorkout)
      return (
        <WorkoutCard
          onPress={() => openNewWorkoutModal(currentDayWorkout.type)}
          type={currentDayWorkout.type}
          ctaText="Noter mes perfs"
        />
      )

    return <ChooseWorkoutCard onPress={() => openNewWorkoutModal()} />
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Text variant="headlineLarge">{weekDay}</Text>
            <Link href="/(app)/(profile)" asChild>
              <IconButton icon="account" mode="contained" />
            </Link>
          </View>
          <Text variant="bodyLarge">{date}</Text>
        </View>
        <View style={styles.currentDayWorkout}>
          <Text variant="headlineMedium">Séance du jour</Text>
          {getCurrentDayWorkout()}
        </View>
        <View style={styles.currentDayWorkout}>
          <Text variant="headlineMedium">Séances passées</Text>
          {!pastWorkouts.length ? (
            <Text>Rentre ta premiere séance </Text>
          ) : (
            pastWorkouts.map(({ title, createdAt, _id }) => (
              <WorkoutCard
                onPress={() => openExistingWorkoutModal(_id.toString())}
                key={_id.toString()}
                ctaText="Voir mes perfs"
                type={title}
                date={formatStandardDateFormat(createdAt)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
