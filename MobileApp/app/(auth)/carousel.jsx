import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { screens } from "../../constants/CarouselScreens";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = async () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
      console.log("currentpageindex:", currentIndex);
    } else {
      // Mark carousel as viewed and navigate to login
      //await AsyncStorage.setItem("hasSeenCarousel", "true");
      router.replace("/new_user_form");
    }
  };
  return (
    <SafeAreaView className="bg-white h-full p-5 flex justify-center">
      <View className="flex justify-center items-center mt-36">
        <View className=" mb-16">
          <Image
            source={screens[currentIndex].image}
            className="w-[300px] h-[300px]"
            resizeMode="contain"
          />
        </View>
        {/* Pagination dots and next */}



        <View className='flex justify-between h-1/4'>
        <View className="flex justify-right">
          <View className='flex-row gap-1'>
          <Text className="text-2xl font-piggiebold pb-2">
            {screens[currentIndex].title}
          </Text>
          <Text className="text-2xl text-piggiePink font-piggiebold pb-2">
            {screens[currentIndex].pinkTitle}
          </Text>
          </View>
         
          <Text className="text-xl font-piggiemedium p-0">
            {screens[currentIndex].text}
          </Text>
        </View>
      </View>
      <View className=" flex-row justify-between items-center w-full px-5">
        {/* Pagination Dots */}
        <View className="flex-row w-auto">
          {screens.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentIndex === index ? "bg-piggieGreen" : "bg-piggieLightGrey"
              }`}
            />
          ))}
        </View>
        <View>
          <Button title={`${currentIndex===screens.length-1?"Continue":"Next"}`} handlePress={handleNext} type="tertiary" />
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Carousel;
