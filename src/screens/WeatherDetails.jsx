import React, { useEffect , useLayoutEffect } from "react";
import { StyleSheet, Text, View , Button , TouchableOpacity} from 'react-native'
import { ROUTES } from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';


const WeatherDetails = ({navigation}) => {


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
          )
        })
      },[navigation])


    return (
        <View>
            <Text>Weather Detail 2</Text>
            <Button onPress={() => navigation.navigate(ROUTES.SIGN_UP)} title='Sign up'/>
        </View>
    )
}

export default WeatherDetails

const styles = StyleSheet.create({})
