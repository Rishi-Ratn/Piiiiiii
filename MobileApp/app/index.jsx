import { ScrollView, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Button from "../components/Button";
import { router, SplashScreen } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import PiggiesplashScreen from "../components/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();
export default function Index() {
  const [fontsLoaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  });
  useEffect(() => {
    const checkCarouselAndAuth = async () => {
      await AsyncStorage.setItem("hasOnboarded", "null");
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      const token = await AsyncStorage.getItem("authToken");
      const tokenExpiresAt = await AsyncStorage.getItem("tokenExpiresAt");
      console.log("hasOnboarded", hasOnboarded);

      const timer = setTimeout(async () => {
        if (token && tokenExpiresAt) {
          const now = new Date().toISOString();
          if (now < tokenExpiresAt) {
            // Token is still valid, redirect to homepage
            router.push("/home");
          } else {
            // Token expired, clear it from storage and redirect to login
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("tokenExpiresAt");
            router.push("/sign-in");
          }
        } else if (hasOnboarded === "true") {
          router.push("/sign-in");
        } else {
          router.push("/carousel");
        }
      }, 3000);

      return () => clearTimeout(timer);
    };

    if (fontsLoaded || error) {
      checkCarouselAndAuth();
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error, router]);

  return (
    <>
      <PiggiesplashScreen />
    </>
  );
}
