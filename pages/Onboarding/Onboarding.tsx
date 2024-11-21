import { useState, useRef, useEffect } from 'react'
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native'
import { IconButton, ProgressBar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { FirstMealStep } from './steps/FirstMealStep'
import { NameStep } from './steps/NameStep'
import { WorkoutDayStep } from './steps/WorkoutDayStep'

const STEPS_MAPPER = {
  FirstMealStep,
  NameStep,
  WorkoutDayStep,
} as const

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

const Onboarding = () => {
  const [currentStep, setCurrentStep] =
    useState<keyof typeof STEPS_MAPPER>('NameStep')
  const fadeAnim = useRef(new Animated.Value(0)).current

  const { push } = useRouter()

  const handleClose = () => {
    push('/(app)')
  }

  const getProgess = (step: keyof typeof STEPS_MAPPER) => {
    if (step === 'NameStep') return 0.01
    if (step === 'WorkoutDayStep') return 0.3
    if (step === 'FirstMealStep') return 0.6
  }

  useEffect(() => {
    fadeAnim.setValue(0)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [currentStep, fadeAnim])

  const CurrentComponent = STEPS_MAPPER[currentStep]

  return (
    <SafeAreaView style={styles.wrapper}>
      <ProgressBar progress={getProgess(currentStep)} />
      <View style={styles.header}>
        {currentStep !== 'NameStep' && (
          <IconButton
            icon="close"
            size={24}
            onPress={handleClose}
            iconColor="white"
          />
        )}
      </View>
      <Animated.View
        style={[
          { flex: 1 },
          { opacity: fadeAnim },
          {
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          },
        ]}
      >
        <CurrentComponent setNextStep={setCurrentStep} />
      </Animated.View>
    </SafeAreaView>
  )
}

export { Onboarding }
