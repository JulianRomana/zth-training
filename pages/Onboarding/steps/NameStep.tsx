import { View } from 'react-native'
import { IconButton, Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useProfileManager } from '@/hooks/useProfileManager'

interface NameStepProps {
  setNextStep: (nextStep: 'WorkoutDayStep') => void
}

const NameStep = ({ setNextStep }: NameStepProps) => {
  const [name, setName] = useState('')
  const { createProfile } = useProfileManager()

  const handleNextStep = () => {
    createProfile({ name })
    setTimeout(() => {
      setNextStep('WorkoutDayStep')
    }, 200)
  }

  return (
    <View>
      <Text>Name Step</Text>
      <TextInput
        label="Ton Nom"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <IconButton icon="arrow-right" onPress={handleNextStep} />
    </View>
  )
}

export { NameStep }
