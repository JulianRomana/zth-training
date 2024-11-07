import { Text } from 'react-native'
import { Redirect, Stack } from 'expo-router'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { useProfile } from '@/hooks/useProfile'

const AppLayout = () => {
  const profile = useProfile()

  if (profile?.isLoadingProfile) {
    return <Text>Loading...</Text>
  }
  // AsyncStorage.removeItem('hasDoneOnboarding')
  // AsyncStorage.removeItem('currentProfileId')
  if (!profile?.profile) {
    return <Redirect href="/onboarding" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)/index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AppLayout
