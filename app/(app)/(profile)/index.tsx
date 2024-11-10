import { SafeAreaView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Profile } from '@/pages/Profile/Profile'
import { useProfile } from '@/hooks/useProfile'

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
})
const ProfilePage = () => {
  const profile = useProfile()

  return (
    <SafeAreaView style={styles.wrapper}>
      {!profile?.profile?.name ? (
        <Text variant="headlineLarge">Loading Profile</Text>
      ) : (
        <Profile />
      )}
    </SafeAreaView>
  )
}

export default ProfilePage
