import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { UserContext } from "../utils/UserContext";
import { FirebaseContext } from "../utils/FirebaseContext";

const Splash = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
    
  useEffect(() => {

    console.log("Splash screen useEffect");

    setTimeout(async () => {
      const user = firebase.getCurrentUser();
      console.log("user result", user);

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
      // 1 second
    }, 1000);
  }, []);

  return (
    <View style={styles.centerAlign}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  centerAlign: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
