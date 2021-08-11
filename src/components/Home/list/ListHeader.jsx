import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ROUTES } from "../../../utils/constants";

const ListHeader = ({ location }) => {
  const navigation = useNavigation();

  // functions
  const listItemHandler = (item) => {
    console.log("@listItemHandler locationID: ", item.id);
    navigation.navigate(ROUTES.WEATHER_DETAILS, { item });
  };

  return (
    <TouchableOpacity
      style={styles.background}
      onPress={() => listItemHandler(location)}
    >
      <Text style={styles.text}>{location.name}</Text>
    </TouchableOpacity>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  background: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    backgroundColor: "silver",
  
    width: "80%",
  },
  text: {
    fontSize: 24,
  },
});
