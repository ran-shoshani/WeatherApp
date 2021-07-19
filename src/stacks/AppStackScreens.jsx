import React, { useContext , useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthStackScreens from './AuthStackScreens';
import MainStackScreens from './MainStackScreens';
import { UserContext } from '../utils/userContext';
import { createStackNavigator } from "@react-navigation/stack";
import Splash from '../screens/Splash';


export default AppStackScreens = () => {

    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext);

    return (
        <AppStack.Navigator headerMode="none">

            {user.isLoggedIn === null ? 
            <AppStack.Screen name={"Splash"} component={Splash}/> 
            
            : 
            
            user.isLoggedIn ?
                <AppStack.Screen name="Main" component={MainStackScreens}/> 
                :
                <AppStack.Screen name="Auth" component={AuthStackScreens}/>
            
            }
        </AppStack.Navigator>
    )
}



//const styles = StyleSheet.create({})
