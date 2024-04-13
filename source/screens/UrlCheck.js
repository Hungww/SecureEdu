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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Header2 from "../components/Header2";
import { set } from "firebase/database";
const UrlCheck = () => {
  async function handleScan(inputUrl) {
    // handle scan
    try {
      const response = await fetch(
        "http://172.28.241.21:5000/api/v1/url_check?target=" + inputUrl
      );
      console.log(response);
      const data = await response.json();
      console.log(data.last_analysis_stats);
      setLast_analysis_stats(data.last_analysis_stats);
      
      
      console.log(data.message);
      setAllScan( data.harmless_results)
      
      setGotScan(true);
    } catch (error) {
      console.log(error);
    }
  }
  async function jsonToText(json) {
    return JSON.stringify(json);
  }
  const [text, setText] = useState("Useless Text");
  const [gotScan, setGotScan] = useState(false);
  const [last_analysis_stats, setLast_analysis_stats] = useState({});
 const [allScan, setAllScan] = useState([]);
 const Item = ({engine_name}) => (
  <View >
    <Text>{engine_name}</Text>
  </View>
);
function SummaryCircle() {
  return (
    <View className="flex flex-col h-[30%]  items-center w-[90%] ">
  </View>
  )
}
  function Summary() {
    if (!gotScan) {
      return <Text></Text>;
    } else {
      return (
        <View className="flex flex-col  items-center w-[90%] mt-[5%] ">
          <View className="w-[100%]">
            <Text className="text-2xl font-medium  text-[#3D8FEF] ">
              Summary
            </Text>
          </View>

          <View className="flex flex-row w-[80%] mt-4 justify-between">
            <View className="flex flex-row  items-center ">
              <Octicons name="dot-fill" size={24} color="green" />
              <Text className="text-green-600 ml-2">
                Harmless: {last_analysis_stats.harmless}
              </Text>
            </View>

            <View className="flex flex-row  items-center">
              <Octicons name="dot-fill" size={24} color="#ffcc00" />
              <Text className="text-[#ffcc00] ml-2">
                Suspicious: {last_analysis_stats.suspicious}
              </Text>
            </View>
          </View>

          <View className="flex flex-row w-[80%] mt-1 justify-between">
            <View className="flex flex-row  items-center ">
              <Octicons name="dot-fill" size={24} color="#cc3300" />
              <Text className=" text-[#cc3300] ml-2">
                Malicious: {last_analysis_stats.malicious}
              </Text>
            </View>

            <View className="flex flex-row  items-center ">
              <Octicons name="dot-fill" size={24} color="gray" />
              <Text className=" text-gray-500 ml-2">
                Undetect : {last_analysis_stats.harmless}
              </Text>
            </View>
          </View>
          {/* <Text>
            {JSON.stringify(allScan)}

          </Text> */}
        <View className="flex flex-col w-[100%] h-[30%] mt-4">

        <View className="flex flex-row w-[100%] h-[90%] justify-center">
          </View>
        <FlatList
        data={allScan}
        renderItem={({item}) => <Item engine_name={item.engine_name}/>}
        keyExtractor={item => item.engine_name}
      />
          </View>
        </View>
      );
    }
  }
  return (
    <SafeAreaView className="bg-[#FFFFFF] h-screen">
      <View className="flex flex-col  items-center h-screen ">
        <Header2 title="URL Check" />
        <Text>
        We scan URLs to check for security risks like malware, protect from inappropriate content, and ensure website reputation and efficiency.
        </Text>
        <SummaryCircle/>
        
        <View className="flex flex-col  items-center w-[90%] ">
        
          <TextInput
            className="rounded-2xl h-16 text-[#4a4949] bg-[#F7F7F9] w-[100%] px-4"
            onChangeText={(text) => setText(text)}
            placeholder="Enter Url..."
            textAlignVertical="center"
          ></TextInput>
        </View>
        <TouchableOpacity
          className="
            flex flex-row items-center justify-center w-[35%] mt-[5%] bg-[#3D8FEF] h-12 rounded-lg
        "
          onPress={() => handleScan(text)}
        >
          <Text className="text-2xl font-medium text-center  text-white ">
            Scan
          </Text>
        </TouchableOpacity>
       
        {/* <FlatList
        data={lessons}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList> */}

      </View>
    </SafeAreaView>
  );
};

export default UrlCheck;
