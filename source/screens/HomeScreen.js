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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";


import HomeHeader from "../components/HomeHeader";
import HomeSearch from "../components/HomeSearch";
import HomeCourse from "../components/HomeCourse";
const Stack = createNativeStackNavigator();
const HomeScreen = ({navigation}) => {
  const [showNoti, setShowNoti] = useState(false);
  return (
    <SafeAreaView className="bg-[#FFFFFF] h-screen">
      <View className="flex flex-col items-center flex-1">

        <HomeHeader noti= {showNoti} setNoti={setShowNoti} />
        <HomeSearch />
        
        <TouchableOpacity className="w-[85%] h-[25%]"
       onPress={() => navigation.navigate("CourseDetail")}
        >
          <Image
            source={require("../../assets/banner.png")}
            className="w-[100%] h-[100%] mt-4"
            resizeMode="contain"
            
          />
        </TouchableOpacity>
        {showNoti && (
          <View className=" w-52, h-52 bg-red-600"
          style={{
            position: "absolute",
            top: 90,
            right: 80,
            zIndex: 1,
          }}
          >
            <Text>
              AAAAAAAAAAAAAAAAAAAAAA
            </Text>
  
          </View>
        )}
        
      <HomeCourse navi= {navigation}  />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
