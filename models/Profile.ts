import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'
import { setHours, setMilliseconds, setMinutes } from 'date-fns'

class Profile extends Realm.Object {
  _id!: Realm.BSON.ObjectId

  name!: string

  upperADay!: number | null

  upperBDay!: number | null

  lowerDay!: number | null

  test!: 'a'

  firstMealTime?: Date

  static generate({ name }: { name: string }) {
    return {
      name,
      upperADay: null,
      upperBDay: null,
      lowerDay: null,
      test: 'a',
      firstMealTime: setHours(
        setMinutes(setMilliseconds(new Date(), 0), 0),
        12
      ),
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
      test: 'string',
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
