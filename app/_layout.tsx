/* eslint-disable global-require */
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'

import { reactPaperTheme } from '@/lib/react-paper'
import { initDefaultLocale } from '@/lib/date-fns'
import { Workout } from '@/db'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()
initDefaultLocale()

const RootLayout = () => {
  const [loaded] = useFonts({
    Abel: require('../assets/fonts/Abel-Regular.ttf'),
    OpenSans: require('../assets/fonts/OpenSans-Medium.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <PaperProvider theme={reactPaperTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  )
}

export default RootLayout
