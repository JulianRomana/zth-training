import { useState } from 'react'
import { Text, SafeAreaView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useProfileManager } from '@/hooks/useProfileManager'
import { useProfile } from '@/hooks/useProfile'

const Onboarding = () => {
  const [name, setName] = useState('')
  const { createProfile } = useProfileManager()
  const { getCurrentProfile } = useProfile()
  const { push } = useRouter()
  const onCreateProfile = () => {
    createProfile({ name })
    getCurrentProfile()
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
