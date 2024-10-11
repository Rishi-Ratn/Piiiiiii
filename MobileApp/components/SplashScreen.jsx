import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'

const PiggiesplashScreen = () => {
  return (
    <View>
     <LottieView style={{ height: '100%', width: '100%' }} resizeMode="cover" source={require('../assets/animations/splash5.json')} autoPlay />
      <Text className='text-white'>Splashscreen</Text>
    </View>
  )
}

export default PiggiesplashScreen