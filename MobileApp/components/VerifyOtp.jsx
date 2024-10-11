import { View, Text } from "react-native";
import React from "react";
import VerifyOtpInput from "./otpInput";
import { router } from "expo-router";
import Button from "./Button";

const VerifyOtp = ({
  handleChange,
  handleSubmit,
  handleResendOtp,
  canResend,
  resendTimer,
  isResending,
  isInvalid,
}) => {
  
  return (
    <View className="mt-4">
      {isInvalid ? (
        <Text className="text-sm font-piggiemedium">
        <Text className="text-red-500">Please re-enter the  </Text>
        <Text className="text-piggieBlue">correct verification code </Text>
        <Text className="text-red-500">sent to your mobile number.</Text>
      </Text>
        
      ) : (
        <Text className="text-sm text-piggieBlue font-piggiemedium">
          Please enter the verification code sent to your phone number.
        </Text>
      )}
      <View className="w-full mb-2 mt-2">
        <VerifyOtpInput
          handleChange={handleChange}
          onFilled={handleSubmit}
          isInvalid={isInvalid}
        />
      </View>
      <View className="w-full justify-center mt-5">
        <View>
          {!isInvalid && (
            <Text className="text-sm text-piggieBlue font-piggiemedium mb-1">
              Didn't receive the OTP?
            </Text>
          )}

          {isInvalid && (
            <View className="flex-row gap-1">
              <Text className="text-sm text-red-500 font-piggiemedium mb-1">
                Invalid OTP.{" "}
              </Text>
              <Text className="text-sm text-piggieBlue font-piggiemedium mb-1 underline">
                Request OTP again.
              </Text>
            </View>
          )}
          {!isInvalid &&
            (canResend ? (
              <Button
                title={isResending ? "Resending..." : "Resend OTP"}
                type="link"
                disabled={isResending}
                handlePress={handleResendOtp}
              />
            ) : (
              <Button
                title={`Resend OTP in ${resendTimer} secs`}
                type="link"
                disabled="true"
                handlePress={handleResendOtp}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

export default VerifyOtp;
