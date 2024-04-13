import React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function AIScreen({ navigation }) {
  return (
    <SafeAreaView className="bg-[#FFFFFF] h-screen">
      <View className="flex flex-col items-center flex-1">
        <View className="flex flex-row items-center justify-center w-[85%] mt-[5%] ">
          <Text className="text-2xl font-medium text-center ">
            Security Service
          </Text>
        </View>

        <TouchableOpacity
          className=" flex flex-col w-[85%] items-center bg-white h-[20%] mt-8 rounded-2xl
         border-[#E5E5E5] shadow-md py-2"
          onPress={() => navigation.navigate("UrlCheck")}
        >
          <View className="flex flex-row items-center w-[95%] justify-between p-2 ">
            <Text className="text-xl font-medium ">Total Scan</Text>
            <AntDesign name="right" size={24} color="#D9D9D9" />
          </View>
          <View className="flex flex-row items-center w-[90%] justify-between ">
            <Text className="w-[60%]">
              An all-in-one transducer, scan all your URL and File, and get the
              results in seconds.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className=" flex flex-col w-[85%] items-center bg-white h-[20%] mt-8 rounded-2xl
         border-[#E5E5E5] shadow-md py-2"
        >
          <View className="flex flex-row items-center w-[95%] justify-between p-2 ">
            <Text className="text-xl font-medium ">Device statistic</Text>
            <AntDesign name="right" size={24} color="#D9D9D9" />
          </View>
          <View className="flex flex-row items-center w-[90%] justify-between ">
            <Text className="w-[60%]">
              Get the statistic of your device, know what is happening on your phone
            </Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          className=" flex flex-col w-[85%] items-center bg-white h-[20%] mt-8 rounded-2xl
         border-[#E5E5E5] shadow-md py-2"
        >
          <View className="flex flex-row items-center w-[95%] justify-between p-2 ">
            <Text className="text-xl font-medium ">Email check</Text>
            <AntDesign name="right" size={24} color="#D9D9D9" />
          </View>
          <View className="flex flex-row items-center w-[90%] justify-between ">
            <Text className="w-[60%]">
              Easily check your email for any suspicious activity. Decide if an email is a phishing email or not.
             
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
