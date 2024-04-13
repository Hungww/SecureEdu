import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
const HomeHeader = ({noti,setNoti}) => {
  return (
    <View className="flex flex-row items-center justify-between w-[85%] mt-[6%]">
      <View>
        <Text className="text-[#2C2C2C] font-semibold text-2xl">Hi, Kim</Text>
        <Text className="text-[#8C8C8C] font-medium text-lg mt-1">
          Find your lesson today!
        </Text>
      </View>

      <TouchableOpacity
      onPress={() => {
        setNoti(!noti);
        
      }}
      >
        <Image
          source={require("../../assets/noti2.png")}
          className="w-[42] h-[42]"
          resizeMode="stretch"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
