import { Realm } from '@realm/react'

type WorkoutName = 'Upper A' | 'Upper B' | 'Lower'
class Workout extends Realm.Object {
  _id!: Realm.BSON.ObjectId

  name!: WorkoutName

  createdAt!: Date

  static generate(name: WorkoutName) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      createdAt: new Date(),
    }
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      createdAt: 'date',
    },
  }
}

export { Workout }
