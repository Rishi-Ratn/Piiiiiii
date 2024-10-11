import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import React, {useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import VerifyOtpInput from "../../components/otpInput";
import { router } from "expo-router";
import Button from "../../components/Button";
import { callAPI } from "../../http/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const verifyOtp = () => {
  const image = require("../../assets/images/bg.png");
  const [otpValue, setOtpValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getPhoneNumberfromStorage();
  }, []);

  
  const getPhoneNumberfromStorage= async () => {
    try {
      const value = await AsyncStorage.getItem('@user_phone_number');
      
      if (value !== null) {
        setPhoneNumber(value);
        
      }
    } catch (e) {
      // error reading value
      console.error(e);
      Alert.alert(`Failed to read data: ${e}`);
    }
  };
  const handleChange = (e) => { 
    setOtpValue(e);
  };

  return (
    <SafeAreaView className=" h-full">
      <ImageBackground source={image} resizeMode="cover" className="flex-1">
        {/* <ScrollView contentContainerStyle={{ height: "100vh" }}> */}
        <View className="h-screen flex w-full">
          <View
            className="bg-white p-10 h-5/6 mt-20 flex"
            style={styles.customRoundedView}
          >
            {/* Header section */}
            <View>
              <View className="w-full">
                <View className="flex-row gap-1">
                  <Text className="text-piggiePink font-bold text-3xl">
                    Stack
                  </Text>
                  <Text className="font-bold text-3xl">Smarter!</Text>
                </View>
                <View className="flex-row gap-1">
                  <Text className="text-black text-base">Log in to</Text>
                  <Text className="text-piggiePink text-base">
                    power up your portfolio.
                  </Text>
                </View>
              </View>
              {/* Input Form */}
              <View className="mt-10">
                <Text className="text-sm text-gray-900">
                  Please enter the verification code sent to your phone number.
                </Text>
                <View className="w-full mb-2 mt-2">
                  <VerifyOtpInput value={otpValue} handleChange={handleChange}  />
                </View>
                <View className="w-full p-2">
                  <Button
                    title="Verify OTP"
                    type="primary"
                    handlePress={handleSubmit}
                  />
                </View>
              </View>
            </View>

            {/* Footer */}

            <View className="w-full justify-center mt-10">
              <View className="flex-row">
                {/* <Text className="text-base text-gray-700">New to Piggie</Text>
              <Text className="text-base text-piggiePink">Stack?</Text> */}
              </View>
              <View className="flex-row gap-1">
                <Text className="text-sm text-gray-700">
                  Didn't receive the OTP?
                </Text>
                <Text
                  className="text-sm text-piggiePink cursor-pointer"
                  onPress={() => router.push("/sign-up")}
                >
                  Resend OTP
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  customRoundedView: {
    borderTopLeftRadius: 70,
    borderRadius: 0,
  },
});

export default verifyOtp;
