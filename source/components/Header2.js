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
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
const Header2 = ({title}) => {
    const [heart, setHeart] = useState("hearto")
    const [heartColor, setHeartColor] = useState("black")
  return (
    <View className="flex flex-row items-center justify-between w-[85%] mt-[1%] ">
      <TouchableOpacity
      
>
        <Image
          source={require("../../assets/backbtn.png")}
          className="w-[55] h-[55] -ml-4"
        />
      </TouchableOpacity>
      <View className="flex flex-row justify-center items-center flex-1 -ml-4">
        <Text className="text-2xl font-medium text-center">{title}</Text>
      </View>

      <TouchableOpacity>
          
      </TouchableOpacity>

    </View>
  );
};

export default Header2;
