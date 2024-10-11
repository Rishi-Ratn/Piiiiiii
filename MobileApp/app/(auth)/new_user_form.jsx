import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { callAPI } from "../../http/axios";
import PhonenumberInput from "../../components/PhonenumberInput";
import Select from "../../components/Select";
import { occupations, salarySlabs } from "../../constants/SelectOptions";
import { useRouter } from "expo-router";

const new_user_form = () => {
  const [form, setForm] = useState({
    username: "",
    mobile: "",
    dob: "",
    occupation: "",
    salarySlab: "",
  });
  const { push } = useRouter();
  const [date, setDate] = useState(new Date());
  const [showDateTimepicker, setShowDateTimepicker] = useState(false);

  const toggleDateTimePicker = () => {
    setShowDateTimepicker(!showDateTimepicker);
  };
  const onChangeforDateTimePicker = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;

      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDateTimePicker();
        const isoDateString = currentDate.toISOString().slice(0, 10);
        setForm((prevForm) => ({
          ...prevForm,
          dob: isoDateString,
        }));
      }
    } else {
      toggleDateTimePicker();
    }
  };
  const confirmIOSDate = () => {
    const isoDateString = date.toISOString().slice(0, 10);
    setForm((prevForm) => ({
      ...prevForm,
      dob: isoDateString,
    }));
    toggleDateTimePicker();
  };

  const handleFormSubmit = async () => {
    try {
      if (
        form.username === "" ||
        form.mobile === "" ||
        form.dob === "" ||
        form.occupation === ""
      ) {
        alert("All fields are required");
      } else {
        const response = callAPI("POST", "/user/signup", {
          phoneNumber: form.mobile,
          username: form.username,
          dateOfBirth: form.dob,
          salarySlab: form.salarySlab,
          occupation: form.occupation,
        });
        alert("Form submitted");
        console.log("formData:", form);
        return response;
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      await AsyncStorage.setItem("hasOnboarded", "true");
      push(
        {
          pathname: '/sign-in', 
          params: { isVerifyOtp: 'true', phoneNumberforSignup: form.mobile },
        }
      )  
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex items-center mt-7 ">
      <ScrollView className="w-full h-full">
        <View className="w-full p-10">
          <View className="mb-10">
            <View className="flex-row gap-1">
              <Text className="font-piggiebold text-3xl">Sign Up &</Text>
              <Text className="text-piggiePink font-piggiebold text-3xl">
                Evolve!
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Text className="text-black text-base font-piggiemedium">
                Experience Financial Evolution.
              </Text>
            </View>
          </View>
          <View className="mb-8">
            <Input
              placeholder="Username"
              type="text"
              handleChange={(e) => setForm({ ...form, username: e })}
            />
          </View>
          <View className="mb-8">
            <PhonenumberInput
              placeholder="Mobile Number"
              value={form.mobile}
              handleChange={(e) => setForm({ ...form, mobile: e })}
            />
          </View>
          <View className="mb-8">
            <Input
              placeholder="Mon Aug 19, 1999"
              type="dateTimePicker"
              toggleDateTimePicker={toggleDateTimePicker}
              handleChange={(e) => setForm({ ...form, dob: e })}
              value={form.dob}
            />

            {showDateTimepicker && (
              <DateTimePicker
                style={{ height: 120, marginTop: -10 }}
                mode="date"
                display="spinner"
                value={date}
                onChange={onChangeforDateTimePicker}
              />
            )}
            {showDateTimepicker && Platform.OS === "ios" && (
              <View className="flex-row justify-center ">
                <Button
                  title="Cancel"
                  type="tertiary"
                  handlePress={toggleDateTimePicker}
                />
                <Button
                  title="Confirm"
                  type="tertiary"
                  handlePress={confirmIOSDate}
                />
              </View>
            )}
          </View>
          
          <View className="mb-8">
            <Select
              dropdownOptions={occupations}
              focusPlaceholder="Occupation"
              blurPlaceholder="Select your occupation"
              value={form.occupation}
              handleChange={(e) => setForm({ ...form, occupation: e })}
            />
          </View>

          <View className="mb-8">
          <Select
              dropdownOptions={salarySlabs}
              focusPlaceholder="Salary Slab"
              blurPlaceholder="Select your salary slab"
              value={form.salarySlab}
              handleChange={(e) => setForm({ ...form, salarySlab: e })}
            />
          </View>
          

          <View className="">
            <Button
              title="Sign Up"
              type="primary"
              handlePress={handleFormSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default new_user_form;
