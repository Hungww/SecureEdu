import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
const CourseDetailVideo = ({videoId}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  
  return (
    <View className="  w-[100%] mt-2">
          <YoutubePlayer
      height={250}
      play={playing}
      videoId={videoId}
      onChangeState={onStateChange}
    />

    </View>
  );
};

export default CourseDetailVideo;
