import React, { useState } from "react";
import { View, Text } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const PhonenumberInput = ({
  label,
  placeholder,
  handleChange,
  value,
  disabled,
  isValidNumber,
  isInvalid,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full">
      {label && (
        <Text className="text-gray-700 font-piggiemedium mb-2">{label}</Text>
      )}
      <PhoneInput
        value={value}
        onChangeFormattedText={handleChange}
        isValidNumber={isValidNumber}
        placeholder={placeholder}
        layout="second"
        disabled={disabled}
        defaultCode="IN"
        containerStyle={{
          width: "100%",
          backgroundColor: "#F3F4F8",
          borderRadius: 30,
          borderWidth: 2, 
          borderColor: isInvalid ? "red" : (disabled || isFocused) ? "#000B50" : "transparent",
        }}
        textContainerStyle={{ backgroundColor: "#f3f4f8", borderRadius: 30 }}
        textInputProps={{
          onFocus: () => setIsFocused(true),  
          onBlur: () => setIsFocused(false),  
        }}
      />
    </View>
  );
};

export default PhonenumberInput;
