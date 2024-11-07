import { useState } from 'react'
import { Text, SafeAreaView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useProfileManager } from '@/hooks/useProfileManager'

const Onboarding = () => {
  const [name, setName] = useState('')
  const { createProfile } = useProfileManager()
  const { push } = useRouter()

  const onCreateProfile = () => {
    createProfile({ name })
    push('/(app)/(home)')
  }

  return (
    <SafeAreaView>
      <Text>Enter your name</Text>
      <TextInput value={name} onChangeText={setName} />
      <Button
        mode="contained"
        onPress={onCreateProfile}
        disabled={!name.length}
      >
        Suivant
      </Button>
    </SafeAreaView>
  )
}

export default Onboarding
