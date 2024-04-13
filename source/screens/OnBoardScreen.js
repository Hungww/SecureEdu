import React, { useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import LottieView from "lottie-react-native";

const data = [
  {
    title: "Check your security \n level",

    text: "We will scan and give you overall points\n of security level",
    image: require("../../assets/sec1.png"),
    key: "1",
    bg: "white",
  },
  {
    title: "Learn everything about\n cybersecurity ",

    text: "We offer you best cybersecurity course with\n quiz to practice",
    image: require("../../assets/sec2.png"),
    key: "2",
    bg: "white",
  },
  {
    title: "Sharing your doubts\n with our forum",

    text: "Let share your story and handle all your\n security problems",
    image: require("../../assets/sec3.png"),
    key: "3",
    bg: "white",
  },
];
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  //tailwind for dot
  //className="w-8 h-8 rounded-5  mx-2"
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },

  //tailwind for button
  //className="flex-1 items-center w-96 bg-red py-5 rounded-2xl"

  //tailwind for buttonText :
  //
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default function OnBoardScreen({ navigation }) {
  slider = undefined;

  _renderItem = ({ item }) => {
    return (
      <View className="flex-1 items-center bg-white pt-20">
        {/* <Image source={item.image} style={styles.image} /> */}
        <Image
          source={item.image}
          style={{ width: "90%", height: "45%", marginTop: -10 }}
        ></Image>
        <View>
          <Image
            source={require("../../assets/slash.png")}
            style={[
              item.key === "1"
                ? { position: "absolute", top: "94%", left: "23%" }
                : item.key === "2"
                ? { position: "absolute", top: "57%", left: 0 }
                : item.key === "3"
                ? {
                    position: "absolute",
                    top: "94%",
                    left: "38%",
                  }
                : {},
            ]}
          ></Image>
          <Text
            className="text-onboard_title_color text-center text-3xl font-roboto-black mb-1 mt-6 "
            style={{ position: "relative" }}
          >
            {item.title}
          </Text>
        </View>

        <Text className=" text-onboard_description_color text-center text-base font-roboto-medium mb-36 mt-4">
          {item.text}
        </Text>
      </View>
    );
  };

  _keyExtractor = (item) => item.title;

  _renderPagination = (activeIndex) => {
    return (
      <View className="absolute bottom-4 left-4 right-4 ">
        <SafeAreaView>
          <View className="h-4 m-4 flex-row justify-center items-center ">
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  className=" w-2 h-2 rounded-lg mx-2 "
                  key={i}
                  style={[
                    i === activeIndex
                      ? {
                          backgroundColor: "#24BAEC",
                          width: 35,
                          height: 8,
                          borderRadius: 8,
                        }
                      : i === (activeIndex + 1) % 3
                      ? {
                          backgroundColor: "#CAEAFF",
                          width: 13,
                          height: 8,
                          borderRadius: 8,
                        }
                      : {
                          backgroundColor: "#CAEAFF",
                          width: 8,
                          height: 8,
                          borderRadius: 8,
                        },
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          {activeIndex ===data.length -1  && (
            <View className="flex flex-col items-center justify-center ">
              <TouchableOpacity
                className=" items-center py-6 rounded-3xl bg-primary mt-8 w-11/12 mb-8"
                // style={[{ width: "96%" }]}
                onPress={() =>
                  navigation.replace("Inside", { screen: "Login" })
                }
              >
                <Text className=" text-white font-bold text-center">
                  {activeIndex === data.length - 1 ? "Get Started" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
                    {!(activeIndex ===data.length -1)  && (
            <View className="flex flex-col items-center justify-center ">
              <TouchableOpacity
                className=" items-center py-6 rounded-3xl bg-primary mt-8 w-11/12 mb-8"
                // style={[{ width: "96%" }]}
                onPress={() =>
                  this.slider?.goToSlide(activeIndex + 1, true)
                }
              >
                <Text className=" text-white font-bold text-center">
                  {activeIndex === data.length - 1 ? "Get Started" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

        </SafeAreaView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        renderPagination={this._renderPagination}
        data={data}
        ref={(ref) => (this.slider = ref)}
      />
    </View>
  );
}
