import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { FirstMealStep } from './steps/FirstMealStep'
import { NameStep } from './steps/NameStep'
import { WorkoutDayStep } from './steps/WorkoutDayStep'

const STEPS_MAPPER = {
  FirstMealStep,
  NameStep,
  WorkoutDayStep,
} as const

const Onboarding = () => {
  const [currentStep, setCurrentStep] =
    useState<keyof typeof STEPS_MAPPER>('NameStep')

  const CurrentComponent = STEPS_MAPPER[currentStep]

  return (
    <SafeAreaView>
      <CurrentComponent setNextStep={setCurrentStep} />
    </SafeAreaView>
  )
}
export { Onboarding }
