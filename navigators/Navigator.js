import React, { useContext } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Login from '../views/Login';
import Single from '../views/Single';
import Modify from '../views/Modify';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainContext } from '../contexts/MainContext';
import Upload from '../views/Upload';
import { Icon } from '@rneui/base';
import MyFiles from '../views/MyFiles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon:({color}) => <Icon name='home' color={color}/>
        }}
        component={Home} />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon:({color}) => <Icon name='cloud-upload' color={color}/>
        }}
        />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon:({color}) => <Icon name='person' color={color}/>
        }}
        component={Profile} />

  </Tab.Navigator>
  )
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return(
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name='Tabs'
            component={TabScreen}
            options={{headerShown : false}} />
          <Stack.Screen name='Single' component={Single} />
          <Stack.Screen name='MyFiles' component={MyFiles} />
          <Stack.Screen name='Modify' component={Modify} />
        </>
      ) : (
        <Stack.Screen name='Login' component={Login}></Stack.Screen>

      )}

    </Stack.Navigator>
    );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
