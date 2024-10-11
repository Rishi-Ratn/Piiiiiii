import { View, Text } from "react-native";
import React from "react";
import { OtpInput } from "react-native-otp-entry";
const VerifyOtpInput = ({ handleChange, value, onFilled, isInvalid }) => {
  return (
    <View className="w-3/4 mt-4 ">
      <OtpInput
        numberOfDigits={4}
        focusStickBlinkingDuration={500}
        onTextChange={handleChange}
        onFilled={onFilled}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: { width: "auto", borderRadius: 0 },
          pinCodeContainerStyle: {
            backgroundColor: "transparent",
            borderRadius: 0,
            borderWidth: 0,
            borderBottomWidth: 4,
            borderColor: "#F3F4F8",
          },
          pinCodeTextStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
            color: isInvalid ? "#FF0000" : "#000B50",
          },
          focusedPinCodeContainerStyle: {
            backgroundColor: "transparent",
            borderRadius: 0,
            borderWidth: 0,
            borderBottomWidth: 4,
            borderColor: "#F08889",
          },
        }}
      />
    </View>
  );
};

export default VerifyOtpInput;
