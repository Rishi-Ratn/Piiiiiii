import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function RootLayout() {
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
       
      </Stack>
    </>
  );
}
