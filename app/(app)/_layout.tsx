import { Redirect, Stack } from 'expo-router'
import { useProfile } from '@/hooks/useProfile'

const AppLayout = () => {
  const profile = useProfile()

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
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AppLayout
