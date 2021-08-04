import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';

const AddLocation = ({handleSearch}) => {
  // states for this component
  const [searchInput, setSearchInput] = useState("");
  const [errorMsg,setErrorMsg] = useState('');


  // context for this component

  // hook call for this component



  //functions for this component
 

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
            onSubmitEditing={() => {handleSearch(searchInput); setSearchInput('');}}
          />
        </View>
        {/* location icon */}
        <TouchableOpacity style={styles.currentLocation}>
          <MaterialIcons name="my-location" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  locationContainer: {
    //alignItems: center,
  },
  locationRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 10,
    borderWidth: 1,
  },
  search: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    //borderWidth:6,
  },
  searchInput: {
    fontSize: 20,
    flex: 1,
    
  },
  currentLocation: {
    padding: 10,
    marginHorizontal: 10,
  },
});
{
  /* <MaterialIcons name="search" size={24} color="black" />
<MaterialIcons name="my-location" size={24} color="black" /> */
}
