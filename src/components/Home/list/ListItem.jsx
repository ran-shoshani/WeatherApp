import React from "react";
import { StyleSheet, Text, View , TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ListItem = ({ item , deleteItem }) => {
  return (
    <View style={styles.background}>
      <Text style={styles.text}>{item.name}</Text>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteItem(item.id)}>
        <MaterialIcons name="remove-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: "lightblue",

  },
  text: {
    fontSize: 20,
  },
  deleteIcon: {
    
  },
});
