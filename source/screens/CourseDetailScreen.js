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
import Header from "../components/Header";
import CourseDetailVideo from "../components/CourseDetailVideo";
import Course from "../controller/Course";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { set } from "firebase/database";

const renderTabBar = (props) => (
  <View className="flex flex-row justify-center items-center  mt-4">
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "#3D8FEF",
      }}
      style={{
        width: "67%",
        backgroundColor: "white",
        elevation: 0,
      }}
      activeColor="#3D8FEF"
      inactiveColor="gray"
    />
  </View>
);

const CourseDetailScreen = ({ route, navigation }) => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({
    id: 0,
    attribute: { name: "", time: "", link: "", available: false },
  });
  const Item = function ({ item }) {
    var image;
    if (selected.id == item.id) {
      image = require("../../assets/1play.png");
    } else {
      image = require("../../assets/2play.png");
    }
    return (
      <TouchableOpacity
        className="mt-4 flex flex-row justify-between"
        onPress={() => {
          console.log("click");
          setSelected(item);
        }}
      >
        {/* <Text >{item.attribute.name}</Text> */}
        <View className="flex flex-row items-center">
          <TouchableOpacity>
            <Image source={image} className=""></Image>
          </TouchableOpacity>
          <View className="flex flex-col ml-2 justify-center -mt-2">
            <Text className=" text-lg font-normal text[#2C2C2C]">
              {item.attribute.name}
            </Text>
            <Text className="text-[#AEAEAE]">
              {parseTime(item.attribute.time)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  async function getData(id) {
    console.log("id", id);
    const res = await Course.getAllLessons(id);

    setLessons(res);

    const course = await Course.get(id);

    setCourse(course);
    setLoading(false);

    console.log("DONE");
  }
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
  const id = route.params.id;
  useEffect(() => {
    getData(id);
    
  }, []);
  useEffect(() => {
    console.log("lessons", lessons);
    if (lessons.length > 0) {
      setSelected(lessons[0]);
    }
  }, [lessons]);

  const FirstRoute = () => (
    <View>
      <FlatList
        data={lessons}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );

  const SecondRoute = () => (
    <View className="flex flex-col w-[100%] justify-center items-center">
      <View className="mt-4">
        <Text>
          Test your knowledge with our minigame. Play and earn point to unlock
          more more useful course
        </Text>
      </View>
      <TouchableOpacity className="w-[80%] flex flex-row justify-center items-center h-[50] rounded-xl mt-[40%] bg-[#3D8FEF]"
      onPress={() => navigation.navigate("Game1_Screen1")}
      
      >
        <Text className="text-white">Play now</Text>
      </TouchableOpacity>
      
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "Lessons" },
    { key: "second", title: "Minigame" },
  ]);
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView className="bg-[#FFFFFF] h-screen">
        <View className="flex flex-col items-center flex-1">
          <Header />
          <CourseDetailVideo videoId={selected.attribute.link} />
          <View className=" flex flex-col w-[90%]">
            <Text className="text-2xl  font-medium text-[#2C2C2C] ">
              {selected.attribute.name}
            </Text>
            <View className="flex flex-row mt-1">
              <View className=" flex flex-row items-center">
                <AntDesign name="clockcircleo" size={18} color="#8C8C8C" />
                <Text className="text-[#8C8C8C] text-sm font-medium ml-1">
                  {parseTime(course.time)}
                </Text>
                <Text className="text-[#8C8C8C] text-sm font-medium"> - </Text>
                <Text className="text-[#8C8C8C] text-sm font-medium">
                  {lessons.length} sections
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-1 flex flex-row justify-center  w-[90%]">
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              renderTabBar={renderTabBar}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default CourseDetailScreen;
