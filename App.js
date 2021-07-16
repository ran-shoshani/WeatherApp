import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
// import Home from './src/screens';
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import WeatherDetails from "./src/screens/WeatherDetails";
import {ROUTES} from './src/utils/constants';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sign In'>  
        <Stack.Screen name={ROUTES.HOME} component={Home} />
        <Stack.Screen name={ROUTES.SIGN_UP} component={SignUp} />
        <Stack.Screen name={ROUTES.SIGN_IN} component={SignIn} />
        <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
        <Stack.Screen name={ROUTES.WEATHER_DETAILS} component={WeatherDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
