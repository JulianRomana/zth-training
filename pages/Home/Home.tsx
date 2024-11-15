import { Link, useRouter } from 'expo-router'
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { format, getDay, getISODay } from 'date-fns'
import { cloneDeep } from 'lodash-es'
import { formatStandardDateFormat, getCurrentDay } from '@/lib/date-fns'
import { WORKOUTS, WorkoutType } from '@/constants/workouts'
import { useWorkoutManager } from '@/hooks/useWorkoutManager'
import { WorkoutCard } from '@/components/WorkoutCard'
import { useProfile } from '@/hooks/useProfile'
import ChooseWorkoutCard from '@/components/ChooseWorkoutCard'
import { COLORS } from '@/constants/colors'

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  date: {
    color: COLORS.grayLighter,
    fontSize: 14,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentDayWorkout: {
    marginTop: 20,
    marginBottom: 32,
  },
  chooseWorkoutCta: {
    marginTop: 70,
  },
  noWorkout: {
    textAlign: 'center',
    marginTop: 50,
  },
})

const Home = () => {
  const { push } = useRouter()
  const { workouts, createWorkout } = useWorkoutManager()
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
    ({ day }) => day === nowDayNumber
  )

  const currentDayCreatedWorkout = workouts.find(
    ({ createdAt }) => getDay(createdAt) === nowDayNumber
  )

  const pastWorkouts = workouts.filter(
    ({ createdAt }) => getDay(createdAt) < nowDayNumber
  )

  const openExistingWorkoutModal = (workoutId: string) => {
    push({
      pathname: '/(app)/workout',
      /*  params: {
        workoutId,
      }, */
    })
  }

  const createNewWorkout = (workoutType?: WorkoutType) => {
    if (!workoutType) {
      push({ pathname: '/(app)/workout' })
      return
    }

    const newWorkoutId = createWorkout({
      title: workoutType,
      exercices: cloneDeep(WORKOUTS[workoutType].exercices),
    })

    push({
      pathname: '/(app)/workout',
      params: {
        workoutId: newWorkoutId.toString(),
      },
    })
  }

  const { date } = getCurrentDay()

  const getCurrentDayWorkout = () => {
    if (currentDayCreatedWorkout)
      return (
        <WorkoutCard
          onPress={() =>
            openExistingWorkoutModal(currentDayCreatedWorkout._id.toString())
          }
          type={currentDayCreatedWorkout.title}
          date={format(currentDayCreatedWorkout.createdAt, 'dd/MM/yyyy')}
        />
      )

    if (currentDayWorkout)
      return (
        <WorkoutCard
          onPress={() => createNewWorkout(currentDayWorkout.type)}
          type={currentDayWorkout.type}
        />
      )

    return <ChooseWorkoutCard onPress={() => createNewWorkout()} />
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View>
          <Text variant="bodyLarge" style={styles.date}>
            {date}
          </Text>
          <View style={styles.header}>
            <Text variant="headlineLarge">Résumé</Text>
            <Link href="/(app)/profile" asChild>
              <IconButton icon="account" mode="contained" />
            </Link>
          </View>
        </View>
        <View style={styles.currentDayWorkout}>
          <Text variant="headlineMedium">Séance du jour</Text>
          {getCurrentDayWorkout()}
        </View>
        <View style={styles.currentDayWorkout}>
          <Text variant="headlineMedium">Séances passées</Text>
          {!pastWorkouts.length ? (
            <Text style={styles.noWorkout} variant="bodyLarge">
              Rentre ta premiere séance
            </Text>
          ) : (
            pastWorkouts.map(({ title, createdAt, _id }) => (
              <WorkoutCard
                onPress={() => openExistingWorkoutModal(_id.toString())}
                key={_id.toString()}
                small
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
