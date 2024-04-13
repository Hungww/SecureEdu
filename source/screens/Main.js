import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { db, auth } from '../utils/firebasecfg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import AIScreen from './AIScreen';
import ForumScreen from './ForumScreen';
import AccountScreen from './AccountScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
export default function Main() {
  async function  logOut() {
    await auth.signOut();
  
    // ...
  
  }
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 2,
        left: 0,
        right: 0,
       

        

        backgroundColor: '#ffffff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: 70,
        shadowColor: "#171717",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        
        
      }


    }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => ( <Entypo name="home" size={30} color={color} />),
        }}/>
      <Tab.Screen 
        name="AI" 
        component={AIScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (<AntDesign name="scan1" size={30} color={color} />),
        }}/>
      <Tab.Screen 
        name="Forum" 
        component={ForumScreen}
        options={{
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="forum" color={color} size={30} />),
        }}/>

      <Tab.Screen 
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="user-alt" size={26} color={color}  />),
        }}/> 
    </Tab.Navigator>
   
  );

}