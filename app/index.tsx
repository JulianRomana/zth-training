import { StyleSheet, Text, SafeAreaView } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
})

const Home = () => {
  const a = 'a'
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Home page</Text>
    </SafeAreaView>
  )
}

export default Home
