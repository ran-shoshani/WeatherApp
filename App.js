import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View , LogBox} from "react-native";

import { UserProvider } from "./src/utils/UserContext";
import AppStackScreens from "./src/stacks/AppStackScreens";
import { FirebaseProvider } from "./src/utils/FirebaseContext";


// rnfes = short cut reactNativeFunctionalExportComponentWithStyles 

export default function App() {
  
useEffect(() => {

      // ignore the warning from firebase
      LogBox.ignoreLogs(['Setting a timer']);

},[])

  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
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

