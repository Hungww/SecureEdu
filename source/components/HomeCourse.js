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
  FlatList,
} from "react-native";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebasecfg";
import Course from "../controller/Course";
import { useState, useEffect } from "react";
import { set } from "firebase/database";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { AntDesign } from '@expo/vector-icons';
//
function parseTime(time) {
  //parse "06:30:00" to "6h 30 min"
  console.log("time", time);

  let timeArray = time.split(":");
  let hours = parseInt(timeArray[0]);
  let minutes = parseInt(timeArray[1]);
  let seconds = parseInt(timeArray[2]);
  let result = "";
  if (hours > 0) {
    result += hours + "h ";
  }
  if (minutes > 0) {
    result += minutes + "min";
  }
  if (seconds > 0) {
    result += seconds + "s";
  }

  return result;
}
const addData = async () => {
  const lessons = [
    {
      id: "1",
      name: "Lesson 1",
      time: "00:10:00",
      link: "https://www.google.com",
    },
    {
      id: "2",
      name: "Lesson 2",
      time: "00:10:00",
      link: "https://www.google.com",
    },
    {
      id: "3",
      name: "Lesson 3",
      time: "00:10:00",
      link: "https://www.google.com",
    },
  ];
  await Course.add(
    "3",
    "https://i.ibb.co/3zGd7h7/course3.png",
    "Cyber Security III: Firewall",
    4.5,
    "02:30:00",
    "This course is designed for beginners",
    lessons
  );
};

const HomeCourse = ({ navi }) => {
  // const data = [

  // ];
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await Course.getAll();
    setData(res);
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const Item = ({ item }) => (
    <TouchableOpacity
      className=" flex flex-col  w-[175] mr-6 bg-white h-[90%] rounded-lg "
      style={{
        shadowColor: "#171717",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
      }}
      onPress={() => navi.navigate("CourseDetail", { id: item.id })}
    >
      <Image
        source={{ uri: item.attribute.image }}
        className="w-[100%] h-[50%] rounded-t-lg"
        resizeMode="stretch"
      ></Image>
      <View>
        <Text className="font-medium ml-4 mt-2 px-1">
          {item.attribute.title}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between mt-5 ">
        <View className="bg-[#EAF4FF] ml-5 p-[2] px-2 rounded-lg">
          <Text className=" font-normal text-[#3D8FEF]">
            {parseTime(item.attribute.time)}
          </Text>
        </View>

        <View className="flex flex-row items-center mr-2">
        <AntDesign name="star" size={15} color="#FFC71E"  />
        <Text
        className=" font-normal mt-1 ml-1 text-[#AEAEAE]"
        >{
          
          item.attribute.rate
          }</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <View className="flex flex-row items-center justify-between w-[85%] mt-[4%] ml-12">
        <Text className=" text-xl font-medium">Popular lessons</Text>
        <Text className=" text-xl text-[#3D8FEF]">See All</Text>
      </View>
      <View className=" w-[100%] mt-[4%] ml-8 ">
        <FlatList
          className="h-[260]"
          data={data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          contentContainerStyle={{ padding: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeCourse;
