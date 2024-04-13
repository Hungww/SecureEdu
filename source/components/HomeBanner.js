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


const HomeBanner = () => {
    return (
        <View className="flex flex-row items-center justify-between w-[85%] h-[20%] mt-[7%]  bg-[#ACD7FF] rounded-2xl">
            <View className="flex flex-col  ml-[5%]">
                <Text className="text-[#2C2C2C] font-semibold ">Discover Cyber Security</Text>
                <Text className="text-[#2C2C2C] font-semibold text-xl">Expense Tracker</Text>
            </View>
            <Image source={require('../../assets/expense.png')} className="w-[40%] h-[100%] mr-[5%]" resizeMode="contain"/>
        </View>
    );
};

export default HomeBanner;