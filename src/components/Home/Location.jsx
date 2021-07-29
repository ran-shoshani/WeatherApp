import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Location = () => {
  const [searchInput, setSearchInput] = useState("");
  const[searchResult, setSearchResult] = useState("");

  const handleSearch = (searchInput) => {
    console.log("handleSearch", searchInput);
  };


  return (
    <View style={styles.locationContainer}>
      <View style={styles.locationRow}>
        <View style={styles.search}>
          <MaterialIcons name="search" size={24} color="black" />

          <TextInput
            style={styles.searchInput}
            placeholder={"Search..."}
            value={searchInput}
            onChangeText={(value) => setSearchInput(value)}
            onSubmitEditing={() => handleSearch(searchInput)}
          />
        </View>
        {/* location icon */}
        <TouchableOpacity style={styles.currentLocation}>
          <MaterialIcons name="my-location" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={styles.searchResult}>
          <Text>{searchResult}</Text>
        </View>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  locationRow: {
    display: "flex",
    flexDirection: "row",
  },
  locationContainer: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },

  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 20,
  },
  // currentLocation: {},
  searchResult: {},
});
{
  /* <MaterialIcons name="search" size={24} color="black" />
<MaterialIcons name="my-location" size={24} color="black" /> */
}
