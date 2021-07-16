import React from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'
import { ROUTES } from '../utils/constants';



const WeatherDetails = ({navigation}) => {
    return (
        <View>
            <Text>Weather Detail 2</Text>
            <Button onPress={() => navigation.navigate(ROUTES.SIGN_UP)} title='Sign up'/>
        </View>
    )
}

export default WeatherDetails

const styles = StyleSheet.create({})
