import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'
import { Exercices, WorkoutType } from '@/constants/workouts'

interface WorkoutExercices {
  first: Omit<Exercices['first'], 'name' | 'reps' | 'factor'>
  second: Omit<Exercices['second'], 'name' | 'reps' | 'factor'>
  third: Omit<Exercices['third'], 'name' | 'reps' | 'factor'>
  fourth: Omit<Exercices['fourth'], 'name' | 'reps' | 'factor'>
  fifth: Omit<Exercices['fifth'], 'name' | 'reps' | 'factor'>
}

interface WorkoutExercicesDictionary
  extends Realm.Dictionary<WorkoutExercices> {}

class Workout extends Realm.Object {
  _id!: Realm.BSON.ObjectId

  title!: WorkoutType

  createdAt!: Date

  exercices!: WorkoutExercicesDictionary

  static generate({
    title,
    exercices,
  }: {
    title: WorkoutType
    exercices: WorkoutExercices
  }) {
    return {
      title,
      exercices,
      createdAt: new Date(),
      _id: new Realm.BSON.ObjectId(),
    }
  }

  static schema: ObjectSchema = {
    name: 'Workout',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      exercices: 'mixed{}',
      createdAt: 'date',
    },
  }
}

export { Workout }
