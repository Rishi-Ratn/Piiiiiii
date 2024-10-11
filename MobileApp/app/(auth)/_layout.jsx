import { StatusBar } from 'react-native';
import React, {useEffect} from 'react'
import { Stack } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
export default function Authlayout() {
  
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <Stack>
          <Stack.Screen name="sign-in" options={{headerShown:false}} />
          <Stack.Screen name="verify-otp" options={{headerShown:false}} />
          <Stack.Screen name="new_user_form" options={{headerShown:false}} />
          <Stack.Screen name="carousel" options={{headerShown:false}} />
    </Stack>
    </>
  )
}
