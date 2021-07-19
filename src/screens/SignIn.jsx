import React, { useContext } from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'
import { ROUTES } from '../utils/constants';
import { UserContext } from '../utils/userContext';
//import firebase from '../utils/firebase';

const SignIn = ({navigation}) => {

    const[user] = useContext(UserContext);
    const handleSignIn = () => {
        user.isLoggedIn = true;
    }


    return (
        <View style={styles.centerAlign}>
            <Text>SignIn 1</Text>
            <Button onPress={() => navigation.navigate(ROUTES.WEATHER_DETAILS)} title='Weather Details'/>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({

    centerAlign:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
    
    })
