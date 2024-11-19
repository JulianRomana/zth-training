import { Image, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useProfileManager } from '@/hooks/useProfileManager'

interface NameStepProps {
  setNextStep: (nextStep: 'WorkoutDayStep') => void
}

const rcpLogo = require('@/assets/images/rcp-logo.png')

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 64,
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    maxWidth: 350,
    marginTop: 104,
  },
  input: {
    paddingVertical: 8,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 32,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  radius: { borderRadius: 8 },
})

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
    <View style={styles.wrapper}>
      <Image source={rcpLogo} style={styles.logo} resizeMode="contain" />
      <Text variant="headlineLarge" style={styles.title}>
        Salut à toi, Hero
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          label="Ton Nom"
          mode="outlined"
          value={name}
          onChangeText={(text) => setName(text)}
          outlineStyle={styles.radius}
          theme={{
            colors: {
              background: 'transparent',
            },
          }}
          style={styles.input}
        />
      </View>
      <Button
        mode="outlined"
        onPress={handleNextStep}
        style={styles.button}
        disabled={name.length < 2}
        textColor="white"
      >
        Continuer
      </Button>
    </View>
  )
}

export { NameStep }
