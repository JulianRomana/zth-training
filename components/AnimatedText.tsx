import { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { Text, TextProps } from 'react-native-paper'

interface AnimatedTextProps extends TextProps<string> {}
const AnimatedText = ({ children, variant, style }: AnimatedTextProps) => {
  const [displayedChildren, setDisplayedChildren] = useState(children)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setDisplayedChildren(children)

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start()
    })
  }, [children, fadeAnim])

  return (
    <Animated.Text
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [
            {
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Text variant={variant} style={style}>
        {displayedChildren}
      </Text>
    </Animated.Text>
  )
}
export { AnimatedText }
