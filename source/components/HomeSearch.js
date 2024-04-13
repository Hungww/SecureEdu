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
import { Feather } from '@expo/vector-icons';


const HomeSearch = () => {
  return (
    <View className="flex flex-row items-center justify-between w-[85%] mt-[5%] place-items-center">
      <View
        className={
          "flex-row items-center justify-center  h-14 w-[80%]  bg-[#F7F7F9] pr-2 rounded-2xl px-4 "
        }
      >
        <Feather name="search" size={30} color="#AEAEAE" className=" mr-4" /> 
        <TextInput style={styles.input } className="rounded-2xl text-[#4a4949] 
        
        "
        
        placeholder="Search now..."
        textAlignVertical="center"

        
        >
        
        
        </TextInput>   
        
      </View>

      
      <TouchableOpacity>
        <Image
          source={require("../../assets/sort.png")}
          className="w-[55] h-[55]"
          resizeMode="stretch"
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F7F7F9",
    paddingHorizontal: 20,

    //marginHorizontal: 2,
    textAlignVertical: "center",
    fontSize: 20,
    marginVertical: 3,
  },
  input_container: {
    width: "90%",
    marginVertical: 8,
  },
});
export default HomeSearch;
