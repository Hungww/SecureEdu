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
import { set } from "firebase/database";
import levenshtein from "fast-levenshtein"
const Game1_Screen1 = ({navigation}) => {
  const [email, setEmail] = useState("kimhello@gmail.com");
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

    const [passWordStrength, setPassWordStrength] = useState({});
    function evaluatePassword(username, password) {
        //parse username (delete @gmail.com)
        username = username.split("@")[0];
        // password contains at least 6 characters:
        console.log("UserName",username);
        console.log("Password",password);
        const isLongEnough = password.length >= 8;
        // password contains at least 1 letter:
        const hasLetter = /[a-zA-Z]/.test(password);
        // password contains at least 1 number:
        const hasNumber = /\d/.test(password);
        // password contains at least 1 special character:
        const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(password);
        // password contains at least 1 uppercase letter:
        const hasUpperCase = /[A-Z]/.test(password);
        //levenshtein distance
        const levenshteinDistance = levenshtein.get(username,password);
        

        const res= {
            isLongEnough: isLongEnough,
            hasLetter: hasLetter,
            hasNumber: hasNumber,
            hasSpecialCharacter: hasSpecialCharacter,
            hasUpperCase: hasUpperCase,
            levenshteinDistance: levenshteinDistance
        }
        return res;
        
    }
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
    <SafeAreaView className="bg-[#FFFFFF] h-screen">
      <View className="flex flex-col  items-center h-screen ">
        <Header2 title="Mission 1: Add account" />
        <View className="w-[85%]">
          <Text className=" text-lg">
            Below is your account. Let's hop on your journey. To begin, we give
            you an user name, please think of a password and add it to your
            account.
          </Text>
        </View>
        <Image
          className="mt-8"
          source={require("../../assets/user_password.png")}
        ></Image>
        <View className="flex justify-center items-center mt-[10%]">
          <View
            className={
              "flex-row items-center justify-center w-10/12  bg-[#F7F7F9] pr-2 rounded-2xl border-2 " +
              borderColorEmail
            }
          >
            <TextInput
              onChange={(text) => handleEmail(text)}
              value={"kimhello@gmail.com"}
              style={styles.input}
              onFocus={() => setBorderColorEmail("border-[#24BAEC]")}
              onBlur={() => setBorderColorEmail("border-[#F7F7F9]")}
              editable={false}
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
        <View className="flex flex-col items-center justify-center w-11/12 ">
            <TouchableOpacity
              className=" items-center py-6 rounded-2xl bg-primary mt-[13%] w-11/12 mb-8"
              // style={[{ width: "96%" }]}
              onPress={async() => {
                const res=  evaluatePassword(email,password);
                console.log(password);
                console.log(res);

                
                
                navigation.navigate("Game1_Screen12",{password:password,res:res})}}
            >
              <Text className=" text-white font-bold text-center">Sign in</Text>
            </TouchableOpacity>
          </View>

      </View>
    </SafeAreaView>
  );
};
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

export default Game1_Screen1;
