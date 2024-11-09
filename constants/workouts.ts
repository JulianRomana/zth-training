enum WorkoutType {
  UPPER_A = 'UpperA',
  UPPER_B = 'UpperB',
  LOWER = 'Lower',
}
interface Exercices {
  first: {
    name: string
    reps: [string, string, string]
    firstSet: string
    secondSet: string
    thirdSet: string
    weight: string
    factor: number
  }
  second: {
    name: string
    reps: [string, string, string]
    firstSet: string
    secondSet: string
    thirdSet: string
    weight: string
    factor: number
  }
  third: {
    name: string
    reps: [string, string, string]
    firstSet: string
    secondSet: string
    thirdSet: string
    weight: string
    factor: number
  }
  fourth: {
    name: string
    reps: [string, string, string]
    firstSet: string
    secondSet: string
    thirdSet: string
    weight: string
    factor: number
  }
  fifth: {
    name: string
    reps: [string, string, string]
    firstSet: string
    secondSet: string
    thirdSet: string
    weight: string
    factor: number
  }
}

const WORKOUTS: Record<WorkoutType, { title: string; exercices: Exercices }> = {
  [WorkoutType.UPPER_A]: {
    title: 'Upper A',
    exercices: {
      first: {
        name: 'Développé couché incliné',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 0.9,
      },
      second: {
        name: 'Tractions lestées',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 0.9,
      },
      third: {
        name: 'Élévations Frontales (pecs)',
        reps: ['15', '15', '15'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      fourth: {
        name: 'Curl incliné haltères',
        reps: ['12', '12', '12'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      fifth: {
        name: 'Élévations latérales',
        reps: ['20', '15', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1.15,
      },
    },
  },
  [WorkoutType.LOWER]: {
    title: 'Lower',
    exercices: {
      first: {
        name: 'High bar squat / Deadlift',
        reps: ['10', '10', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      second: {
        name: 'Romanian deadlift / Fentes',
        reps: ['15', '15', '15'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      third: {
        name: 'Leg curl superset - Leg extension',
        reps: ['12', '12', '12'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      fourth: {
        name: 'Extensions mollets',
        reps: ['15', '12', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      fifth: {
        name: 'Upright row penché',
        reps: ['20', '15', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1.2,
      },
    },
  },
  [WorkoutType.UPPER_B]: {
    title: 'Upper B',
    exercices: {
      first: {
        name: 'Overhead press',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 0.9,
      },
      second: {
        name: 'Développé couché',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 0.9,
      },
      third: {
        name: 'Tractions prise neutre',
        reps: ['12', '12', '12'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      fourth: {
        name: 'Oiseau assis prise neutre',
        reps: ['15', '15', '15'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1,
      },
      fifth: {
        name: 'Upright row',
        reps: ['15', '12', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
        weight: '',
        factor: 1.2,
      },
    },
  },
}

export { WORKOUTS, WorkoutType, type Exercices }
