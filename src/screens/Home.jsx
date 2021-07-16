import React from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'
import { ROUTES } from '../utils/constants';


const Home = ({navigation}) => {
    return (
        <View>
            <Text>Home 4</Text>
            <Button onPress={() => navigation.navigate(ROUTES.HOME)} title='Home'/>
        </View>
    )
}

export default Home



const styles = StyleSheet.create({})
