/* eslint-disable global-require */
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'

import { RealmProvider } from '@realm/react'
import { LogBox } from 'react-native'
import { reactPaperTheme } from '@/lib/react-paper'
import { initDefaultLocale } from '@/lib/date-fns'
import { schemas } from '@/models'
import { IS_DEV } from '@/constants'
import { ProfileProvider } from '@/contexts/ProfileContext/ProfileContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()
initDefaultLocale()
LogBox.ignoreAllLogs()
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

  return (
    <PaperProvider theme={reactPaperTheme}>
      <RealmProvider schema={schemas} deleteRealmIfMigrationNeeded={IS_DEV}>
        <ProfileProvider>
          <Slot />
        </ProfileProvider>
      </RealmProvider>
    </PaperProvider>
  )
}

export default RootLayout
