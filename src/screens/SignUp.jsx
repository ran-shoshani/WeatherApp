import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ROUTES } from "../utils/constants";

const SignUp = ({ navigation }) => {
  return (
    <View>
      <Text>SignUp 3</Text>
      <Button onPress={() => navigation.navigate(ROUTES.HOME)} title="Home" />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
