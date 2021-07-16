import React from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'
import { ROUTES } from '../utils/constants';



const Profile = ({navigation}) => {
    return (
        <View>
            <Text>Profile</Text>
            <Button onPress={() => navigation.navigate(ROUTES.SIGN_IN)} title='Sign out'/>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
