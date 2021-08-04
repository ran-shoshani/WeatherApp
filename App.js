import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View , LogBox} from "react-native";

import { UserProvider } from "./src/utils/UserContext";
import AppStackScreens from "./src/stacks/AppStackScreens";
import { FirebaseProvider } from "./src/utils/FirebaseContext";


// https://lottiefiles.com/search?q=sun&category=animations



// rnfes =  react native function export component

export default function App() {
  // if (state.isLoading) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }
  // state.isLoading is FALSE

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

{
  /* <Stack.Screen name={ROUTES.HOME} component={Home} />
<Stack.Screen name={ROUTES.SIGN_UP} component={SignUp} />
<Stack.Screen name={ROUTES.SIGN_IN} component={SignIn} />
<Stack.Screen name={ROUTES.PROFILE} component={Profile} />
<Stack.Screen
  name={ROUTES.WEATHER_DETAILS}
  component={WeatherDetails}
/> */
}
