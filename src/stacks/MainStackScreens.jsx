import React, {} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import WeatherDetails from "../screens/WeatherDetails";
import { ROUTES } from '../utils/constants';


export default MainStackScreens = () => {

    const MainStack = createStackNavigator();

    return (
        <MainStack.Navigator>
            <MainStack.Screen name={ROUTES.HOME} component={Home}/>
            <MainStack.Screen name={ROUTES.PROFILE} component={Profile}/>
            <MainStack.Screen name={ROUTES.WEATHER_DETAILS} component={WeatherDetails}/>
        </MainStack.Navigator>
    )

}



//<MainStack.Navigator headerMode = "none">