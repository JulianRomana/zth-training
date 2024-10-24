import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { COLORS } from '@/constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
  },
})

const WorkoutModal = () => (
  <View style={styles.container}>
    <Text variant="headlineLarge">Upper 1</Text>
    <ScrollView>
      <Text variant="headlineSmall">Développé couché incliné</Text>
      <Text variant="headlineSmall">Tractions lestées</Text>
      <Text variant="headlineSmall">Élévations frontales</Text>
      <Text variant="headlineSmall">Curl incliné haltères</Text>
      <Text variant="headlineSmall">Élévations latérales</Text>
    </ScrollView>
    <Button mode="contained" textColor={COLORS.secondary} style={styles.button}>
      Sauvgarder mes perfs
    </Button>
  </View>
)

export default WorkoutModal
