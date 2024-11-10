import { isNil, capitalize } from 'lodash-es'
import { addDays, formatDate, startOfWeek } from 'date-fns'
import { WorkoutDay } from './WorkoutDay'
import { WorkoutType } from '@/constants/workouts'
import { DayOption } from '@/types'
import { useProfile } from '@/hooks/useProfile'

interface ChooseWorkoutDayProps {
  updateProfileWorkoutDay: (
    workout: 'upperADay' | 'upperBDay' | 'lowerDay',
    day: number
  ) => void
}

const DAYS = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
] as const

const ChooseWorkoutDay = ({
  updateProfileWorkoutDay,
}: ChooseWorkoutDayProps) => {
  const { profile } = useProfile()
  const getWeekDay = (dayNumber: number | undefined | null) => {
    if (isNil(dayNumber)) return 'Non définis'
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 }) // Sunday as 0
    const weekday = addDays(startDate, dayNumber)
    return capitalize(formatDate(weekday, 'EEEE'))
  }

  const WORKOUT_TYPE_KEY_MAPPER = {
    [WorkoutType.UPPER_A]: 'upperADay',
    [WorkoutType.UPPER_B]: 'upperBDay',
    [WorkoutType.LOWER]: 'lowerDay',
  } as const

  const setWorkout = (workoutType: WorkoutType, workoutDay: number) => {
    updateProfileWorkoutDay(WORKOUT_TYPE_KEY_MAPPER[workoutType], workoutDay)
  }

  const getDayList = (currentWorkoutType: WorkoutType): DayOption[] => {
    const takenDays = [
      profile?.upperADay,
      profile?.upperBDay,
      profile?.lowerDay,
    ]

    return DAYS.map((label, index) => {
      const dayNumber = index + 1
      const isCurrentDay =
        profile?.[WORKOUT_TYPE_KEY_MAPPER[currentWorkoutType]] === dayNumber

      return {
        id: dayNumber,
        label,
        isDisabled: !isCurrentDay && takenDays.includes(dayNumber),
      }
    })
  }

  return (
    <>
      <WorkoutDay
        workoutName="Upper A"
        activeWorkout={getWeekDay(profile!.upperADay)}
        setWorkout={(workoutDay) => setWorkout(WorkoutType.UPPER_A, workoutDay)}
        dayList={getDayList(WorkoutType.UPPER_A)}
      />
      <WorkoutDay
        workoutName="Upper B"
        activeWorkout={getWeekDay(profile!.upperBDay)}
        setWorkout={(workoutDay) => setWorkout(WorkoutType.UPPER_B, workoutDay)}
        dayList={getDayList(WorkoutType.UPPER_B)}
      />
      <WorkoutDay
        workoutName="Lower"
        activeWorkout={getWeekDay(profile!.lowerDay)}
        setWorkout={(workoutDay) => setWorkout(WorkoutType.LOWER, workoutDay)}
        dayList={getDayList(WorkoutType.LOWER)}
      />
    </>
  )
}

export default ChooseWorkoutDay
