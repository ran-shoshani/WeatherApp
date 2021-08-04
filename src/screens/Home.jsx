import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
// name import
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';

// default import
import AddLocation from "../components/Home/AddLocation";
import CitiesList from "../components/Home/CitiesList";

const Home = ({ navigation }) => {
  // states for this component

  const [searchResult, setSearchResult] = useState();
  const [currentPosition, setCurrentPosition] = useState();


  // hook call for this component
  useEffect(() => {
    console.log("Home Page Screen");
  });

  const handleHeaderPress = () => {
    console.log("Header button pressed");
    navigation.navigate(ROUTES.PROFILE);
  };

  const handleSearch = (searchInput) => {
    console.log("handleSearch", searchInput);
    
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleHeaderPress}>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);



  useEffect(() => {
    // get currrentlocation here so it is ready
    ( async () => {
      let{status} = await Location.requestForegroundPermissionsAsync();
    if ( status !== 'granted'){
      setErrorMsg('Premission to access location denied')
    }
    console.log('requestForegroundPermissionsAsync status', status);
    let location = await Location.getCurrentPositionAsync({});

    setCurrentPosition(location);
    console.log('CurrentLocation:',location);
    })();
  },[])

  return (
    <View style={styles.centerAlign}>
      <AddLocation handleSearch={handleSearch}/>
      {/* <Text>Home 4</Text> */}
      {/* API data => to city name */}
      {/* Location */}
      {/* Flat List + cities */}
      <CitiesList/>
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
    //justifyContent: "center",
  },
});
