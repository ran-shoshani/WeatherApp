import React, { useEffect , useLayoutEffect } from "react";
import { StyleSheet, Text, View, Button ,TouchableOpacity } from "react-native";
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from '@expo/vector-icons';



const Home = ({ navigation }) => {

  useEffect(() => {
    console.log("Home Page Screen");
  });

  const handleHeaderPress = () => {
    console.log("Header button pressed");
    navigation.navigate(ROUTES.PROFILE);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:()=> (
        <TouchableOpacity onPress={handleHeaderPress}>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </TouchableOpacity>
      )
    })
  },[navigation])




  return (
    <View style={styles.centerAlign}>
      <Text>Home 4</Text>
      <Button
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
        title="Profile Page"
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  centerAlign: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
