import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const home = () => {
  const Logout = async() => {
    await AsyncStorage.removeItem('authToken')
    console.log('Logout')
    router.replace('/sign-in')
  }
  return (
    <SafeAreaView className='p-5'>
      <Text className='text-3xl font-piggiebold'>HomePage</Text>
      <View className='mt-4'>
      <Button title='Sign Out' type='primary' handlePress={Logout}/>
      </View>
    </SafeAreaView>
  )
}

export default home