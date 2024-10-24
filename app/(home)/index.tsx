import { format } from 'date-fns'
import { Link, useRouter } from 'expo-router'
import { StyleSheet, SafeAreaView, View, Image, Pressable } from 'react-native'
import { Button, Text, IconButton } from 'react-native-paper'
import { capitalize } from 'lodash-es'
import { COLORS } from '@/constants/Colors'

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentDayWorkout: {
    marginTop: 50,
  },
  workoutCard: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 14,
    marginTop: 20,
    backgroundColor: COLORS.secondary,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  workoutLogo: {
    width: 120,
    height: 140,
    marginEnd: 10,
  },
  workoutTitle: {
    color: 'white',
    marginBottom: 'auto',
  },
})

const currentWeekDay = capitalize(format(new Date(), 'eeee'))
const currentDay = format(new Date(), 'dd MMMM yyyy')

const Home = () => {
  const { push } = useRouter()
  const openModal = () => push('/(home)/modal')

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <View style={styles.header}>
          <Text variant="headlineLarge">{currentWeekDay}</Text>
          <Link href="/(profile)" asChild>
            <IconButton icon="account" mode="contained" />
          </Link>
        </View>
        <Text variant="bodyLarge">{currentDay}</Text>
      </View>
      <View style={styles.currentDayWorkout}>
        <Text variant="headlineMedium">Séance du jour</Text>
        <Pressable onPress={openModal}>
          <View style={styles.workoutCard}>
            <Image
              style={styles.workoutLogo}
              source={require('@/assets/images/upper1.png')}
            />
            <View>
              <Text variant="headlineLarge" style={styles.workoutTitle}>
                Upper 1
              </Text>
              <Button
                mode="contained"
                textColor={COLORS.secondary}
                onPress={openModal}
              >
                Noter mes perfs
              </Button>
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Home
