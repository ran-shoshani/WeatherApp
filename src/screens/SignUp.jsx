import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ROUTES } from "../utils/constants";

const SignUp = ({ navigation }) => {
  return (
    <View>
      <Text>SignUp</Text>
      <Button onPress={() => navigation.navigate(ROUTES.SIGN_IN)} title="Sign In" />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
