import { View, Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Button = ({
  handlePress,
  disabled,
  title,
  additionalStyles,
  type,
  icon,
  ...props
}) => {
  let baseStyles = "pt-3 pb-3 rounded-full";
  let textStyle = "text-lg font-piggiebold";
  let buttonStyles = "";
  let disabledStyles = "";

  switch (type) {
    case "primary":
      buttonStyles = "w-full flex justify-center items-center";
      textStyle = "text-white font-piggiesemiBold text-2xl ";
      disabledStyles="bg-gray-300";
      break;
    case "secondary":
      buttonStyles = "bg-gray-300 flex justify-center";
      textStyle = "text-piggiePink font-piggiesemiBold text-lg";
      disabledStyles="bg-gray-300";
      break;
    case "tertiary":
      buttonStyles = "bg-transparent flex justify-center items-center";
      textStyle = "text-piggieBlue font-piggiesemiBold text-lg";
      disabledStyles="bg-gray-300";
      break;
    case "link":
      buttonStyles = "bg-transparent";
      textStyle = "text-piggiePink font-piggiesemiBold underline";
      disabledStyles="text-gray-300";
      break;
    case "iconText":
      buttonStyles = "flex flex-row justify-center items-center";
      textStyle = "text-piggiePink font-piggiesemiBold text-lg ml-2";
      disabledStyles="bg-gray-300";
      break;
    default:
      buttonStyles = "bg-piggiePink text-white";
  }
  return type === "primary" ? (
    <Pressable
      className={`${buttonStyles} ${additionalStyles} ${
        disabled ? disabledStyles : ""
      }`}
      onPress={handlePress}
      disabled={disabled}
    >
      <LinearGradient
        colors={["#F2ABAC", "#EE7071"]} // Your gradient colors
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0.1, 1]}
        className={`${baseStyles} ${buttonStyles} ${additionalStyles}`}
      >
        <Text className={`${textStyle}`}>{title}</Text>
      </LinearGradient>
    </Pressable>
  ) : (
    <Pressable
      className={`${baseStyles} ${buttonStyles} ${additionalStyles} ${
        disabled ? disabledStyles : ""
      }`}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text className={`${textStyle}`}>{title}</Text>
    </Pressable>
  );
};

export default Button;
