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

const AddLocation = ({handleSearch,updateCurrentLocation}) => {


  // states for this component
  const [searchInput, setSearchInput] = useState("");
  const [errorMsg,setErrorMsg] = useState('');


  // context for this component

  // hook call for this component

  //functions for this component
  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced})
    console.log("getLocation @AddLocation.jsx - currentLocation: ", location);
    const coords ={
      latitude:location.coords.latitude,
      longitude:location.coords.longitude
    }
    updateCurrentLocation(coords);
  }

  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={()=> getLocation()} style={styles.currentLocation}>
          <MaterialIcons name="my-location" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
   
  },
  locationRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  searchInput: {
    fontSize: 20,
    flex: 1,
    
  },
  currentLocation: {
    padding: 10,
  },
});

