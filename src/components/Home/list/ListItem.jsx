import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ROUTES } from "../../../utils/constants";

const ListItem = ({ item, deleteItem }) => {

  //hooks
  const navigation = useNavigation();

  // functions
  const listItemHandler = (item) => {
    console.log("@listItemHandler locationID -->: ", item);
    navigation.navigate(ROUTES.WEATHER_DETAILS,{item});
  };

  return (
    <TouchableOpacity
      style={styles.background}
      onPress={() => listItemHandler(item)}
    >
      <Text style={styles.text}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => deleteItem(item.id)}
      >
        <MaterialIcons name="remove-circle" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  background: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "lightblue",
    width: "70%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deleteIcon: {},
});
