import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity , FlatList , Alert } from "react-native";
// name import
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
// default import
import AddLocation from "../components/Home/AddLocation";
import ListItem from "../components/Home/list/ListItem";
import ListHeader  from "../components/Home/list/ListHeader";
import * as Location from "expo-location";
import axios from "axios";
import API_CALL from "../utils/clientSecrets/openWeather";


const Home = ({ navigation }) => {
  // states for this component
  const [cityListSource, setCityListSource] = useState([
    { name: "loading current location", id: "999" },
  ]);
  

  // hook call for this component

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
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Premission to access location denied");
      }
      console.log("requestForegroundPermissionsAsync status", status);
      //get the current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
    
      console.log("@Home screen check  - CurrentLocation:", location);

      // distructioning object to variables
      const coords ={
        latitude:location.coords.latitude,
        longitude:location.coords.longitude
      }
      console.log("latitude: ", coords.latitude,'&longitude: ',coords.longitude);

      //if we got the coordinates we need, we can proceed to fetching the coordinates
      if (coords.latitude) {
        searchByCoordinates(coords)
      }
    })();
  }, []);


// funcions
  const searchByCoordinates = (coords) => {
    let {latitude,longitude} = coords;
    let currentLocation;

    const URL = `${API_CALL.BASE_URL}lat=${latitude}&lon=${longitude}${API_CALL.UNIT}${API_CALL.KEY}`;
        axios
          .get(URL)
          .then((response) => {
            console.log("response: ", response.data);
            currentLocation = {
              name: response.data.name,
              id: response.data.id.toString(),
            };
            // add currentlocation to the cityListSource array 
            setCityListSource(cityListSource.splice(0, 1, currentLocation));
          })
          .catch((error) => {
            console.log("error @axios.get(): ", error);
            setCityListSource(
              cityListSource.splice(0, 1, {
                name: "error getting location",
                id: "9999",
              })
            );
          })
          .finally(() => {
            // add currentlocation to the cityListSource array 
            setCityListSource(cityListSource.splice(0, 1, currentLocation));
            console.log("axios.get finally");
            console.log("@118 finally cityListSource: ", cityListSource);
          });
  }

  const updateCurrentLocation = (location) => {
    console.log("update current location: ",location);
    searchByCoordinates(location);
  };

  const handleHeaderPress = () => {
    console.log("Header button pressed");
    navigation.navigate(ROUTES.PROFILE);
  };


  const saveToStorage = async () => {

  }

  const loadFromStorage = async () => {

  }

  

  const handleSearch = (searchInput) => {
    console.log("handleSearch", searchInput);

    const URL = `${API_CALL.BASE_URL}q=${searchInput}${API_CALL.UNIT}${API_CALL.KEY}`;
    axios
      .get(URL)
      .then((response) => {
        console.log("response: ", response.data);
        let currrentLcation = {
          name: response.data.name,
          id: response.data.id.toString(),
        };
        console.log("currrentLcation: ", currrentLcation);

        setCityListSource([...cityListSource, currrentLcation]);
      })
      .catch((error) => {
        console.log("error @handleSearch axios.get(): ", error);
        Alert.alert("Location not found",error.message,[{text:"OK"}]);
      });
  };

  const renderItem = ({ item }) => {
    //console.log('item in renderlist:', item);
    return <ListItem item={item} />;
  };

  

  

  

  return (
    <View style={styles.centerAlign}>
      <AddLocation handleSearch={handleSearch} updateCurrentLocation={updateCurrentLocation} />
      {/* <Text>Home 4</Text> */}
      {/* API data => to city name */}
      {/* Location */}
      {/* Flat List + cities */}
      <FlatList
        data={cityListSource}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
      />
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
