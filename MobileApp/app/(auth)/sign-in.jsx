import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useMemo } from "react";
import Button from "../../components/Button";
import PhonenumberInput from "../../components/PhonenumberInput";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { callAPI } from "../../http/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerifyOtp from "../../components/VerifyOtp";

const SignIn = () => {
  const image = require("../../assets/images/bg.png");
  //const { push } = useRouter();
  const { isVerifyOtp = "false", phoneNumberforSignup = "" } =
    useLocalSearchParams();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpInputValue, setOtpInputValue] = useState("");
  const [disablePhoneNumberInput, setDisablePhoneNumberInput] = useState(false);
  const [verifyOtpInputVisible, setVerifyOtpInputVisible] = useState(false);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [shouldVerifyOtp, setShouldVerifyOtp] = useState(
    isVerifyOtp === "true"
  );
  const [resendTimer, setResendTimer] = useState(0); // Start with 0, only trigger when needed
  const [canResend, setCanResend] = useState(true); // Initially, user can send OTP
  const [isResending, setIsResending] = useState(false);
  const [isInvalidOtp, setIsInvalidOtp] = useState(false);

  useEffect(() => {
    if (shouldVerifyOtp) {
      setVerifyOtpInputVisible(true);
      setDisablePhoneNumberInput(true);
    }
  }, [shouldVerifyOtp]);

  // useEffect(() => {
  //   if (shouldVerifyOtp && isOtpSent && verifyOtpInputVisible) {
  //     console.log("OTP Input should be visible");
  //   } else {
  //     console.log("OTP Input should not be visible");
  //   }
  // }, [shouldVerifyOtp, isOtpSent, verifyOtpInputVisible]);

  const handleChange = (e) => {
    setPhoneNumber(e);
    if (shouldVerifyOtp) {
      setPhoneNumber(phoneNumberforSignup); //test this piece of code
    }
  };
  const handleotpInputChange = (e) => {
    setOtpInputValue(e);
   
    
  };

  const handleEnablePhoneNumberInput = () => {
    setVerifyOtpInputVisible((prevState) => !prevState);
    setIsOtpSent((prevState) => !prevState);
    setDisablePhoneNumberInput(false);
  };

  const setPhoneNumberinStorage = async (phoneNumber) => {
    try {
      await AsyncStorage.setItem("@user_phone_number", phoneNumber);
      Alert.alert("Data saved successfully");
    } catch (e) {
      // saving error
      console.error(e);
      Alert.alert(`Failed to save data: ${e}`);
    }
  };
  
  const handleverifyOtpSubmit = async (otpInputValue) => {
    try {
      // const response = await callAPI("POST", "/otp/verifyotp", {
      //   phoneNumber: phoneNumber,
      //   code: otpInputValue,
      // });
      // const { token, session } = response;
      // await AsyncStorage.setItem("authToken", token);
      // await AsyncStorage.setItem("tokenExpiresAt", session.expiresAt);
      
      //console.log("response from verify OTP:", response);
      setIsInvalidOtp(false);
      if(otpInputValue==='0000'){
        setIsInvalidOtp(true);
      }
      else if(otpInputValue==='1234'){
        setIsInvalidOtp(false);
        router.replace("/home");
      }
      
    } catch (error) {
      console.log("error response:", error);
      setIsInvalidOtp(true);
    } finally {
      console.log("phoneNumber:", phoneNumber);
      console.log("OTP:", otpInputValue);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      setCanResend(false);
      setResendTimer(30);

      // await callAPI("POST", "/otp/sendotp", {
      //   phoneNumber: value,
      // });

      const timerInterval = setInterval(() => {
        setResendTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setCanResend(true);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("handleSubmit called");

      // const response = callAPI("POST", "/otp/sendotp", {
      //   phoneNumber: phoneNumber,
      // });
      // setPhoneNumberinStorage(phoneNumber);
      // console.log("response:", response);
      const sanitizedPhoneNumber = phoneNumber.replace("+91", "").trim();

      if (
        sanitizedPhoneNumber.length > 10 ||
        sanitizedPhoneNumber.length < 10
      ) {
        Alert.alert("Please enter a valid phone number");

        console.log("Sanitized Phone Number:", sanitizedPhoneNumber);
        return;
      }
      console.log("Sending OTP...");

      setIsOtpSent(true);
      setDisablePhoneNumberInput(true); 
      setVerifyOtpInputVisible(true); 
    } catch (error) {
      Alert.alert("Error:", error.message || "Failed to send OTP.");
      console.error("Error in handleSubmit:", error);
    }
  };
  return (
    <SafeAreaView className=" h-full">
      <ImageBackground source={image} resizeMode="cover" className="flex-1">
        {/* <ScrollView contentContainerStyle={{ height: "100vh" }}> */}
        <View className="h-screen pt-10 flex w-full">
          <View
            className="bg-white p-10 pl-12 pr-12 h-5/6 mt-20 flex justify-between"
            style={styles.customRoundedView}
          >
            {/* Header section */}
            <View>
              <View
                className={`w-full mt-10 ${shouldVerifyOtp ? "pl-0" : "pl-3"}`}
              >
                <View className="flex-row gap-1">
                  <Text className="text-piggiePink font-piggiesemiBold text-3xl">
                    Stack
                  </Text>
                  <Text className="font-piggiesemiBold text-3xl">Smarter!</Text>
                </View>
                <View className="flex-row gap-1 pt-2">
                  <Text className="text-black text-base font-piggiemedium">
                    Log in to
                  </Text>
                  <Text className="text-piggiePink text-base font-piggiemedium">
                    power up your portfolio.
                  </Text>
                </View>
              </View>
              {/* Input Form */}

              <View className={`${shouldVerifyOtp ? "mt-16" : "mt-4"}`}>
                {!shouldVerifyOtp && (
                  <View className="w-full pb-2">
                    <PhonenumberInput
                      placeholder="Mobile Number"
                      value={phoneNumber}
                      handleChange={handleChange}
                      disabled={disablePhoneNumberInput}
                      isInvalid={isInvalidOtp}
                    />
                  </View>
                )}

                {!shouldVerifyOtp && !isOtpSent && (
                  <View className="w-full pt-2">
                    <Button
                      title="Login"
                      type="primary"
                      handlePress={handleSubmit}
                      disabled={loginButtonDisabled}
                    />
                  </View>
                )}
              </View>

              {verifyOtpInputVisible && (
                <View className="mt-0">
                  <VerifyOtp
                    value={otpInputValue}
                    handleChange={handleotpInputChange}
                    handleSubmit={handleverifyOtpSubmit}
                    handleResendOtp={handleResendOtp}
                    canResend={canResend}
                    resendTimer={resendTimer}
                    isResending={isResending}
                    isInvalid={isInvalidOtp}
                  />
                </View>
              )}
            </View>

            {/* Footer */}
            {!isOtpSent && !verifyOtpInputVisible && !shouldVerifyOtp && (
              <View className="w-full items-center justify-center mt-10">
                <View className="flex-row">
                  <Text className="text-base text-gray-700 font-piggiemedium">
                    New to Piggie
                  </Text>
                  <Text className="text-base text-piggiePink font-piggiemedium">
                    Stack?
                  </Text>
                </View>
                <View className="flex-row gap-1 mt-1">
                  <Text
                    className="text-base text-piggiePink font-piggiemedium"
                    onPress={() => router.push("/sign-up")}
                  >
                    Sign Up
                  </Text>
                  <Text className="text-base text-gray-700 font-piggiemedium">
                    & Evolve your investments!
                  </Text>
                </View>
              </View>
            )}
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

export default SignIn;
