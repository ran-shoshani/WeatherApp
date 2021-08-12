import React, { useState, useEffect, useLayoutEffect , useRef } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity , FlatList , Alert , ImageBackground , StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// name import
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import {ASYNC_CITY_LIST} from "../utils/constants";
// default import
import AddLocation from "../components/Home/AddLocation";
import ListItem from "../components/Home/list/ListItem";
import ListHeader  from "../components/Home/list/ListHeader";
import * as Location from "expo-location";
import axios from "axios";
import API_CALL from "../utils/clientSecrets/openWeather";


const Home = ({ navigation }) => {

  const image = require("../styles/frog1.jpg");

  //ref 
  const firstRender = useRef(true);

  // states for this component
  const [cityListSource, setCityListSource] = useState([]);
  const [currentPosition,setCurrentPosition] = useState({name: "loading current location", id: "-1" });
  
  // hook call for this component
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
        <StatusBar translucent={true} backgroundColor="#539edd" barStyle="dark-content"/>
        <TouchableOpacity style={{marginRight: 20}} onPress={handleHeaderPress}>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </TouchableOpacity>
        </>
      ),
      headerStyle:{
        backgroundColor:"#529edd",
      }
    });
  }, [navigation]);

  useEffect(() => {

    // loada from CityListSource storage
    loadFromStorage();

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

  // save to storage after each render when the state of the item has been changed.
  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;
      return;
    }

    console.log("@useEffect,[cityListSource]: ",cityListSource);
    saveToStorage();

  },[cityListSource]);

  //useRef() =>  ------------------
  
// funcions
  const searchByCoordinates = (coords) => {
    let {latitude,longitude} = coords;
    let currentLocation;

    const URL = `${API_CALL.BASE_URL}lat=${latitude}&lon=${longitude}${API_CALL.UNIT}${API_CALL.KEY}`;
        axios
          .get(URL)
          .then((response) => {
            //console.log("response: ", response.data);
            currentLocation = {
              name: response.data.name,
              id: response.data.id.toString(),
              coord: response.data.coord,
            };
            console.log("@searchByCoordinates object:", currentLocation)
            // add currentlocation to the cityListSource array 
            setCurrentPosition(currentLocation);
          })
          .catch((error) => {
            console.log("error @axios.get(): ", error);
            setCurrentPosition({name: "error getting location",id: "-2"});
          })
          .finally(() => {
            // add currentlocation to the cityListSource array 
            console.log("axios.get finally");
            
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
    try {
      await AsyncStorage.setItem(ASYNC_CITY_LIST, JSON.stringify(cityListSource))
        .then(() => {
          //log a success message after storing the cityListSource list
          console.log("@saveToStorage SAVING TO STORAGE SUCCESFULL: ");
          console.log('data stored successfully');
          console.log("stored data: ", JSON.stringify(cityListSource));
        })
    } catch (err) {
      console.log(err.message);
    }
  }

  const loadFromStorage = async () => {
    try {
      await AsyncStorage.getItem(ASYNC_CITY_LIST)
        .then((stringifyCityList) => {
          // if ASYNC_CITY_LIST is not null, there's a string to parse
          if (stringifyCityList) {
            console.log("@loadFromStorage LOADING FROM STORAGE SUCCESFULL: ");
            console.log("stringifyTodoList: ", stringifyCityList);
            const parseCityList = JSON.parse(stringifyCityList)
            setCityListSource(parseCityList);
          }
        });
    } catch (err) {
      console.log("@loadFromStorage: ",err.message);
    }
  }


  const handleSearch = (searchInput) => {
    console.log("handleSearch", searchInput);

    //api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    const URL = `${API_CALL.BASE_URL}q=${searchInput}${API_CALL.UNIT}${API_CALL.KEY}`;
    axios
      .get(URL)
      .then((response) => {
        console.log("response: ", response.data);
        let currrentLcation = {
          name: response.data.name,
          id: response.data.id.toString(),
          coord: response.data.coord,
        };
        console.log("currrentLcation: ", currrentLcation);

        setCityListSource([...cityListSource, currrentLcation]);
      })
      .catch((error) => {
        console.log("error @handleSearch axios.get(): ", error);
        Alert.alert("Location not found",error.message,[{text:"OK"}]);
      })
      .finally(() => {

        saveToStorage();
      })
  };

  const deleteItem = (id) => {
    const updatedList = cityListSource.filter(item  => item.id != id);
    setCityListSource(updatedList);
    saveToStorage();
  }


  const renderItem = ({ item }) => {
    //console.log('item in renderlist:', item);
    return (<ListItem item={item} deleteItem={deleteItem} />) ;
  };

  

  

  

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
      <AddLocation handleSearch={handleSearch} updateCurrentLocation={updateCurrentLocation} />
      
      <FlatList
        data={cityListSource}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader location={currentPosition}/>}
      />
      
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    //justifyContent: "center",
  },
});
