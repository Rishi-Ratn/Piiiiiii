import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { salarySlabs } from "../constants/SelectOptions";

const Select = ({
  value,
  setValue,
  focusPlaceholder,
  blurPlaceholder,
  dropdownOptions,
  handleChange,
}) => {
     
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = (item) => (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: item.value === value ? "#333333" : "transparent",
      }}
      onPress={() => {
        handleChange(item.value);
        
     //    setIsFocus(false);
      }}
    >
      <Text style={{ color: item.value === value ? "white" : "gray" }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View
      className={`border-2 flex flex-row items-center w-full h-14 bg-piggieLightGrey px-4 rounded-full ${
        isFocus ? "border-piggieBlue" : "border-piggieLightGrey"
      }`}
    >
      {dropdownOptions===salarySlabs ? <SimpleLineIcons name="briefcase" size={21} color="#000B50" style={{marginRight: 18, marginLeft: 8}} /> 
      : <SimpleLineIcons name="wallet" size={21} color="#000B50" style={{marginRight: 18, marginLeft: 8}} /> }
      <Dropdown
        data={dropdownOptions}
        selectedTextStyle={styles.selectedTextStyle}
        fontFamily="Montserrat-Medium"
        maxHeight={300}
        renderItem={renderItem}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `${focusPlaceholder}` : `${blurPlaceholder}`}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          handleChange(item.value);
          setIsFocus(false);
        }}
        containerStyle={{ marginTop: 16, borderRadius: 10 }}
        placeholderStyle={styles.placeholderStyle}
        style={{ flex: 1 }}  
      />
    </View>
  );
};

export default Select;
const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#6B7280",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
