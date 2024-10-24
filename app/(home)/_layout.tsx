import { Stack } from 'expo-router'

const HomeLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
    <Stack.Screen
      name="modal"
      options={{
        presentation: 'modal',
      }}
    />
  </Stack>
)

export default HomeLayout
