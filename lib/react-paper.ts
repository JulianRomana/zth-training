import { MD3LightTheme as DefaultTheme } from 'react-native-paper'
import { COLORS } from '@/constants/colors'

const reactPaperTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
  },
  fonts: {
    ...DefaultTheme.fonts,
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: 'Abel',
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: 'Abel',
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: 'Abel',
    },
  },
  roundness: 0,
}

export { reactPaperTheme }
