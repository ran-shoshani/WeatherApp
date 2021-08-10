import React, { useEffect , useLayoutEffect } from "react";
import { StyleSheet, Text, View , Button , TouchableOpacity} from 'react-native'
import { ROUTES } from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import API_CALL from "../utils/clientSecrets/openWeather";

const WeatherDetails = ({navigation, route}) => {

  // destruxture the item from params 
  const {lat,lon}=route.params.item.coord;
  
  // states
  
  // hooks
    const handleHeaderPress = () => {
        console.log("Header button pressed");
        navigation.navigate(ROUTES.PROFILE);
      }


      useLayoutEffect(() => {
        navigation.setOptions({
          headerRight:()=> (
            
            <TouchableOpacity onPress={handleHeaderPress}>
              <MaterialIcons name="account-circle" size={24} color="black" />
            </TouchableOpacity>
          ),
          title:route.params.item.name
        })
      },[navigation])


      useEffect(() => {
        console.log("route param item", route.params.item);
      },[])


      // functions

    return (
        <View>
            <Text>Weather Details</Text>
            <Text>Latitude:{lat}</Text>
            <Text>Longitude:{lon}</Text>
        </View>
    )
}

export default WeatherDetails

const styles = StyleSheet.create({


})
