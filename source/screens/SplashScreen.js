import React, { useEffect } from "react";

import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SplashScreen = () => {
  useEffect(() => {
    // Add any necessary logic or API calls here
    // Example: setTimeout(() => { navigateToNextScreen() }, 3000);
    setTimeout(() => {
      //alert error
    }, 5000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#3D8FEF]">
      <Image
        source={require("../../assets/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text
        className="text-white text-4xl font-bold"
        style={{
          position: "absolute",
          bottom: 50,
          left: 50,
          right: 50,
          textAlign: "center",
        }}
      >
        SecureEdu
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "40%",
    height: "40%",
    marginTop: -60,
  },
});

export default SplashScreen;
