import { Link } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import { Button } from 'react-native-paper'

const Profile = () => (
  <SafeAreaView>
    <Text>My Profile</Text>
    <Link href="/(home)" asChild>
      <Button mode="contained">Go to main</Button>
    </Link>
  </SafeAreaView>
)

export default Profile
