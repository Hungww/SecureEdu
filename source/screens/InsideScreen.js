import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";

//Importing the screens
import Main from './Main';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import SplashScreen from './SplashScreen';
import AIScreen from './AIScreen';


import CourseDetailScreen from './CourseDetailScreen';
import UrlCheck from './UrlCheck';
import Game1_Screen1 from './Game1_Screen1';
import Game1_Screen12 from './Game1_Screen12';


const Stack = createNativeStackNavigator();

export default function InsideScreen({  route ,navigation }) {

  const ScreenName = route.params.screen;
  var ScreenComponent = null;
  if (ScreenName == "SignUp") {
    ScreenComponent = SignUpScreen;
  }
  else {
    ScreenComponent = LoginScreen;
  }



  const [user_uid, setUser_uid] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser_uid(user.uid)
      console.log("User is signed in")
      // ...
    } else {
      // User is signed out
      setUser_uid("")
      console.log("User is signed out")
      // ...
    }
  });
  return (
    <Stack.Navigator      
    screenOptions={{
      headerShown: false
    
    }}>
 
      {user_uid ? (
        <Stack.Screen name="Main" component={Main} />
        
      ) : (
        

        <Stack.Screen name={ScreenName} component={ScreenComponent} />

      )}

<Stack.Screen name = "CourseDetail" component={CourseDetailScreen} />
<Stack.Screen name = "UrlCheck" component={UrlCheck} />
<Stack.Screen name = "Game1_Screen1" component={Game1_Screen1} />
<Stack.Screen name='Game1_Screen12' component={Game1_Screen12} />



      

    </Stack.Navigator>
  );
}