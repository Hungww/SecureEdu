import React from 'react';
import { View, Text, Button } from 'react-native';
import { useState } from 'react';

const ForumScreen = () => {
    const [showNoti, setShowNoti] = useState("false");
    return (
        <View className="flex flex-1 h-[100%] flex-row items-center justify-center">
            <Button title="Forum Screen" onPress={async() => {
                //fetch data
                try{const response = await fetch("http://192.168.0.107:5000/api/v1/url_check?target=" + "facebook.com");
                    console.log(response)
                    const data = await response.json();
                    console.log(data.message);
                ;}
                catch(error){
                    console.log(error);
                }
                



            }} />
        </View>
    );
};

export default ForumScreen;