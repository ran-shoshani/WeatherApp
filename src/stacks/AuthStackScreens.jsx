import React, {} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { ROUTES } from '../utils/constants';

export default AuthStackScreens = () => {

    const AuthStack = createStackNavigator();

    return(
        <AuthStack.Navigator headMode="none">
            <AuthStack.Screen name={ROUTES.SIGN_IN} component={SignIn}/>
            <AuthStack.Screen name={ROUTES.SIGN_UP} component={SignUp}/>
        </AuthStack.Navigator>
    )
}

