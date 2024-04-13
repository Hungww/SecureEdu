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
import { Octicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import Header2 from "../components/Header2";

async function getResults(password) {}
const Game1_Screen12 = ({ route, navigation }) => {
  let { password, res } = route.params;
  function getScore() {
    let score = 0;
    if (res.hasNumber) {
      score += 1;
    }
    if (res.hasSpecialCharacter) {
      score += 1;
    }
    if (res.hasUpperCase) {
      score += 1;
    }
    if (res.isLongEnough) {
      score += 1;
    }
    if (res.hasLetter) {
      score += 1;
    }
    if (res.levenshteinDistance > 4) {
      score += 1;
    }
    return score / 6;
  }
  function getGrade(score) {
    if (score >= 1) {
      return "Very Strong";
    }
    if (score >= 0.8) {
      return "Strong";
    }
    if (score >= 0.6) {
      return "Medium";
    }
    if (score >= 0.4) {
      return "Weak";
    }
    return "Very Weak";
  }
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}
  function makeBetterPassword() {
    let newpassword = password;
    if (res.levenshteinDistance < 4) {
        //change some characters
        newpassword =reverseString(password);
         
      }
  
    if (!res.isLongEnough) {
      //add random string
      newpassword += makeid(6);
    }
    if (!res.hasNumber) {
      //add random number
      newpassword += Math.floor(Math.random() * 10);
    }
    if (!res.hasSpecialCharacter) {
      //add random special character
      newpassword += "!@";
    }
    if (!res.hasUpperCase) {
      //make some characters uppercase
      newpassword =
        newpassword.slice(0, 3) + newpassword.slice(3).toUpperCase();
    }
    if (!res.hasLetter) {
      //add random letter
      newpassword += "a";
    }
  
    return newpassword;
  }

  const score = getScore();
  const grade = getGrade(score);
   
    var betterPassword= makeBetterPassword();
    var betterPassword2= makeBetterPassword();
    var betterPassword3= makeBetterPassword();
  var color;
  if (grade == "Very Strong") {
    color = "#49B27B";
  } else if (grade == "Strong") {
    color = "#A4C64C";
  } else if (grade == "Medium") {
    color = "#F9BD38";
  } else {
    color = "#F27576";
  }

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-screen">
      <View className="flex flex-col  items-center h-screen ">
        <Header2 title="Your result !!" />
        <View className="flex w-[85%]">
          <Text className="text-lg font-medium  text-[#3D8FEF] mt-4">
            Your password strength is: {grade}
          </Text>
        </View>
        <View
          className={
            " w-[85%] h-[10%] flex flex-row items-center justify-between   mt-4 rounded-xl  border-4 "
          }
          style={{ borderColor: color }}
        >
          <Text className="ml-6" style={{ color: color }}>
            {password}
          </Text>
          <View
            className=" flex flex-row w-[30%] h-[80%] mr-4 rounded-lg "
            style={{ backgroundColor: color }}
          >
            <Text className="text-white text-sm font-medium m-auto">
              {" "}
              {grade}
            </Text>
          </View>
        </View>
        <Image
          className="mt-8"
          source={require("../../assets/colorbar.png")}
        ></Image>
        {score < 1 && (
          <View className="flex mt-4 ml-10 w-[85%]">
            <Text className=" text-2xl text-red-600 mb-4">
              {" "}
              To improve your password :
            </Text>
            {res.isLongEnough ? null : (
              <Text className=" text-base text-red-600">
                {" "}
                Your password should be at least 6 characters long
              </Text>
            )}
            {res.hasNumber ? null : (
              <Text className=" text-base text-red-600">
                {" "}
                Your password should contains a number
              </Text>
            )}
            {res.hasSpecialCharacter ? null : (
              <Text className=" text-base text-red-600">
                {" "}
                Your password should contains a special character
              </Text>
            )}
            {res.hasUpperCase ? null : (
              <Text className=" text-base text-red-600">
                {" "}
                Your password should contains an uppercase letter
              </Text>
            )}

            {res.hasLetter ? null : (
              <Text className=" text-base text-red-600">
                {" "}
                Your password should contains a letter
              </Text>
            )}
            {res.levenshteinDistance > 4 ? null : (
              <Text className=" text-base text-red-600">
                {" "}
                Your password should not be similar to your username
              </Text>
            )}

            <View className="mt-4 flex flex-col ml-2">
              <Text className="text-2xl"> Recommend new password</Text>
              <Text className="ml-8"> {betterPassword}</Text>
              <Text className="ml-8"> {betterPassword2}</Text>
                <Text className="ml-8"> {betterPassword3}</Text>
            </View>

          </View>
        )}
        
        <TouchableOpacity
              className=" w-[85%] flex flex-row justify-center items-center h-[50] rounded-xl mt-6 bg-[#3D8FEF]"
              onPress={() => navigation.navigate("Game1_Screen1")}
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Game1_Screen12;
