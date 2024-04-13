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
const Header = () => {
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
      <View className="flex flex-row justify-center items-center flex-1 ">
        <Text className="text-2xl font-medium text-center">Course Overview</Text>
      </View>

      <TouchableOpacity
            onPress={()=>{
                if(heart === "hearto"){
                  setHeart("heart")
                }else{
                  setHeart("hearto")
                }
                if(heartColor === "black"){
                  setHeartColor("red")
                }
                else{
                  setHeartColor("black")
                }
              }}>
        <AntDesign name={heart} size={30} color={heartColor} />
      </TouchableOpacity>

    </View>
  );
};

export default Header;
