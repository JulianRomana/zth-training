enum WorkoutTitle {
  UpperA = 'UpperA',
  UpperB = 'UpperB',
  Lower = 'Lower',
}

const WORKOUTS = {
  [WorkoutTitle.UpperA]: {
    title: 'Upper A',
    exercices: {
      first: {
        name: 'Développé couché incliné',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      second: {
        name: 'Tractions lestées',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      third: {
        name: 'Élévations Frontales (pecs)',
        reps: ['15', '15', '15'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      fourth: {
        name: 'Curl incliné haltères',
        reps: ['12', '12', '12'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      fifth: {
        name: 'Élévations latérales',
        reps: ['20', '15', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
    },
  },
  [WorkoutTitle.Lower]: {
    title: 'Lower',
    exercices: {
      first: {
        name: 'High bar squat / Deadlift',
        reps: ['10', '10', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      second: {
        name: 'Romanian deadlift / Fentes',
        reps: ['15', '15', '15'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      third: {
        name: 'Leg curl superset - Leg extension',
        reps: ['12', '12', '12'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      fourth: {
        name: 'Extensions mollets',
        reps: ['15', '12', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      fifth: {
        name: 'Upright row penché',
        reps: ['20', '15', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
    },
  },
  [WorkoutTitle.UpperB]: {
    title: 'Upper B',
    exercices: {
      first: {
        name: 'Développé couché incliné',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      second: {
        name: 'Tractions lestées',
        reps: ['6', '8', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      third: {
        name: 'Élévations Frontales (pecs)',
        reps: ['15', '15', '15'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      fourth: {
        name: 'Curl incliné haltères',
        reps: ['12', '12', '12'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
      fifth: {
        name: 'Élévations latérales',
        reps: ['20', '15', '10'],
        firstSet: '',
        secondSet: '',
        thirdSet: '',
      },
    },
  },
}

export { WORKOUTS, WorkoutTitle }
