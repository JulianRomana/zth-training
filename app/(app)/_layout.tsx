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
        contentStyle: { backgroundColor: 'black' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="workout" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AppLayout
