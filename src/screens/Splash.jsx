import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { UserContext } from "../utils/UserContext";
import { FirebaseContext } from "../utils/FirebaseContext";
import LottieView from "lottie-react-native";

const Splash = () => {
  // contexs
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  // hooks
  useEffect(() => {
    console.log("Splash screen useEffect");

    getCurrentUser();
  }, []);

  // functions
  const getCurrentUser = async () => {
    try {
      const user = await firebase.onAuthStateChanged();

      if (user) {
        console.log("Splash before getUserInfo()", user.uid);

        const userInfo = await firebase.getUserInfo(user.uid);

        console.log("Splash result getUserInfo ", userInfo);
        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          username: userInfo.username,
        });
      } else {
        console.log("---Splash screen useEffect user not found");
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    } catch (error) {
      console.log("error checking for a user: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <LottieView 
          source={require("../../assets/animations/rotating-sun-loop.json")}
          autoPlay
          loop
          style={{width:"100%"}}
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    //justifyContent: "center",
    marginTop:'50%',
    alignItems: "center",
  },
});
