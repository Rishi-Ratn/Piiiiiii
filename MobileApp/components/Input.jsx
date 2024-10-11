import { View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

const Input = ({
  type,
  value,
  additionalStyles,
  handleChange,
  placeholder,
  toggleDateTimePicker,
  ...props
}) => {
  return (
    <View className={`${additionalStyles}`}>
      <View className="border-2 flex-row bg-piggieLightGrey border-piggieLightGrey w-full h-14 px-4 focus:border-piggieBlue rounded-full">
        {type === "dateTimePicker" ? (
          <Pressable
            onPress={toggleDateTimePicker}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <View className="flex-row items-center p-2 rounded-full w-full">
              <Feather name="calendar" size={22} color="#000B50" />
              <TextInput
                className="text-black ml-4 text-base font-psemibold w-full"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#6B7280"
                editable={false}
                onPressIn={toggleDateTimePicker}
                pointerEvents="none"
              />
            </View>
          </Pressable>
        ) : (
          <View className="flex-row items-center p-2 rounded-full w-full">
            <FontAwesome5 name="user" size={22} color="#000B50" />
            <TextInput
              className="ml-4 text-black flex-1 text-base font-psemibold w-full"
              value={value}
              onChangeText={handleChange}
              secureTextEntry={type === "password" && !showPassword}
              placeholder={placeholder}
              placeholderTextColor="#6B7280"
              {...props}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Input;
