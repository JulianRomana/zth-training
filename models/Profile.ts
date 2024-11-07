import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

class Profile extends Realm.Object {
  _id!: Realm.BSON.ObjectId

  name!: string

  upperADay!: number | null

  upperBDay!: number | null

  lowerDay!: number | null

  firstMealTime?: Date

  static generate({ name }: { name: string }) {
    return {
      name,
      upperADay: null,
      upperBDay: null,
      lowerDay: null,
      firstMealTime: new Date(),
      _id: new Realm.BSON.ObjectId(),
    }
  }

  static schema: ObjectSchema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: {
        type: 'string',
      },
      upperADay: {
        type: 'int',
        optional: true,
      },
      upperBDay: {
        type: 'int',
        optional: true,
      },
      lowerDay: {
        type: 'int',
        optional: true,
      },
      firstMealTime: {
        type: 'date',
        optional: true,
      },
    },
  }
}

export { Profile }
