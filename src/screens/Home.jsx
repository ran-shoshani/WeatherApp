import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import axios from "axios";
// name import
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';

// default import
import AddLocation from "../components/Home/AddLocation";
import CitiesList from "../components/Home/CitiesList";
import API_CALL from "../utils/clientSecrets/openWeather";


const Home = ({ navigation }) => {
  // states for this component

  const [searchResult, setSearchResult] = useState();
  const [currentPosition, setCurrentPosition] = useState();
  const [location, setLocation] = useState(null);
  const [currentCity,setCurrentCity] = useState();
  
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
    //get the current location 
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    // let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced}).then(()=>{
    //   setLocation(location);
    // });

    //setCurrentPosition(location);
    console.log('Home screen check  - CurrentLocation:',location);

    const {latitude,longitude}=location.coords;
    console.log('latitude: ',latitude);
    console.log('longitude: ',longitude);


    //if we got the coordinates we need, we can proceed to fetching the coordinates
    if(latitude&&longitude){
      const URL = `${API_CALL.BASE_URL}lat=${latitude}&lon=${longitude}${API_CALL.UNIT}${API_CALL.KEY}`;
      axios.get(URL)
        .then((response) => {
          console.log("response: ", response.data);
          let name = response.data.name;
          let id = response.data.id;
          console.log("name: ", name);
          console.log("id: ", id);
          setCurrentCity({name,id});
        })
        .catch((error) => {
          console.log('error @axios.get(): ', error);
          
        })
        .finally(() => {
          console.log('axios.get finally');

        });
    }

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
