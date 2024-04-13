import * as React from "react";
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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";

import Error from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import { db, auth } from "../utils/firebasecfg";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Stack = createNativeStackNavigator();
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [re_password, setRePassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  const [nameVerified, setNameVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [rePasswordVerified, setRePasswordVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [borderColor, setBorderColor] = useState("border-[#F7F7F9]");
  const [borderColorEmail, setBorderColorEmail] = useState("border-[#F7F7F9]");
  const [borderColorPassword, setBorderColorPassword] =
    useState("border-[#F7F7F9]");
  const [borderColorRePassword, setBorderColorRePassword] =
    useState("border-[#F7F7F9]");
  function handleEmail(e) {
    const emailVal = e.nativeEvent.text;
    setEmail(emailVal);
    setEmailVerified(false);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setEmail(emailVal);
      setEmailVerified(true);
    }
  }

  function handlePassword(e) {
    const passwordVal = e.nativeEvent.text;
    setPassword(passwordVal);
    setPasswordVerified(false);
    // password contains at least 6 characters, including at least 1 letter and 1 number
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(passwordVal)) {
      setPasswordVerified(true);
      setPassword(passwordVal);
    }
  }
  return (
    <SafeAreaView className="bg-[#FFFFFF] h-screen"

    >
      <KeyboardAvoidingView>
        <View className="flex  justify-center items-center ">
          <Text className="text-3xl font-normal text-center mt-[15%]">
            Sign in now
          </Text>
          <Text className="text-lg font-normal text-center mt-4 text-[#7D848D]">
            Please sign in to continue our app
          </Text>

          <View className="flex justify-center items-center mt-[10%]">
            <View
              className={
                "flex-row items-center justify-center w-10/12  bg-[#F7F7F9] pr-2 rounded-2xl border-2 " +
                borderColorEmail
              }
            >
              <TextInput
                onChange={(text) => handleEmail(text)}
                value={email}
                placeholder="ex: email@example.com"
                style={styles.input}
                onFocus={() => setBorderColorEmail("border-[#24BAEC]")}
                onBlur={() => setBorderColorEmail("border-[#F7F7F9]")}
              />
            </View>
          </View>

          <View className="flex justify-center items-center mt-6">
            <View
              className={
                "flex-row items-center justify-center w-10/12  bg-[#F7F7F9] pr-2 rounded-2xl  border-2  " +
                borderColorPassword
              }
            >
              <TextInput
                onChange={(text) => handlePassword(text)}
                value={password}
                secureTextEntry={showPassword}
                placeholder="Your password here..."
                style={styles.input}
                onFocus={() => setBorderColorPassword("border-[#24BAEC]")}
                onBlur={() => setBorderColorPassword("border-[#F7F7F9]")}
              />
              <TouchableOpacity
                className="mr-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                {password.length < 1 ? null : showPassword ? (
                  <Feather name="eye" size={20} color="#7D848D" />
                ) : (
                  <Feather name="eye-off" size={20} color="#7D848D" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex justify-end items-end w-10/12">
            <TouchableOpacity onPress={() => {}}>
              <Text
                className="text-base font-normal text-center color-[#FF7029] mt-4"
                onPress={() =>
                  navigation.replace("Inside", { screen: "Login" })
                }
              >
                {" "}
                Forget password?
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-col items-center justify-center w-11/12 ">
            <TouchableOpacity
              className=" items-center py-6 rounded-2xl bg-primary mt-[13%] w-11/12 mb-8"
              // style={[{ width: "96%" }]}
              onPress={() => loginWithEmailPassword()}
            >
              <Text className=" text-white font-bold text-center">Sign in</Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-center w-11/12 ">
            <Text className="text-base font-normal text-center text-[#7D848D]">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                className="text-base font-normal text-center color-[#FF7029]"
                onPress={() =>
                  navigation.replace("Inside", { screen: "Login" })
                }
              >
                {" "}
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-base font-normal text-center text-[#7D848D] mt-4">
            Or connect
          </Text>
          
            <View
              className="flex flex-row justify-between w-[46%] mt-[12%]
               "
              
            >
              <Image
                source={require("../../assets/facebook2.png")}
                className=" w-[50] h-[50]"
              />
              <Image
                source={require("../../assets/instagram3.png")}
                className=" w-[50] h-[50]"
              />
              <Image
                source={require("../../assets/twitter.png")}
                className=" w-[50] h-[50]"
              />
            </View>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  async function loginWithEmailPassword() {
    //genarate random email and password
    const sign_email = email;
    const sign_password = password;
    signInWithEmailAndPassword(auth, sign_email, sign_password)
      .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "#F7F7F9",
    borderRadius: 40,
    paddingHorizontal: 20,

    //marginHorizontal: 2,
    marginVertical: 3,
  },
  input_container: {
    width: "90%",
    marginVertical: 8,
  },
});
