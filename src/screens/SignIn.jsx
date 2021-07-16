import React from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'
import { ROUTES } from '../utils/constants';


const SignIn = ({navigation}) => {
    return (
        <View>
            <Text>SignIn 1</Text>
            <Button onPress={() => navigation.navigate(ROUTES.WEATHER_DETAILS)} title='Weather Details'/>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({})
