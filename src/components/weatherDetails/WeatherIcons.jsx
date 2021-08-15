import React from 'react'
import { StyleSheet, Text, View , Image } from 'react-native'

const WeatherIcons = ({icon}) => {

    return (
        <View>
            <Image
                style={styles.weatherIcon} source={{uri:icons[icon]}}
            />
        </View>
    )
}

export default WeatherIcons

const styles = StyleSheet.create({
    weatherIcon: {

        width: 110,
        height: 110,
    }

})
const icons = {
    '01d':'http://openweathermap.org/img/wn/01d@4x.png',
    '01n':'http://openweathermap.org/img/wn/01n@4x.png',
    '02d':'http://openweathermap.org/img/wn/02d@4x.png',
    '02n':'http://openweathermap.org/img/wn/02n@4x.png',
    '03d':'http://openweathermap.org/img/wn/03d@4x.png',
    '03n':'http://openweathermap.org/img/wn/03n@4x.png',
    '04d':'http://openweathermap.org/img/wn/04d@4x.png',
    '04n':'http://openweathermap.org/img/wn/04n@4x.png',
    '09d':'http://openweathermap.org/img/wn/09d@4x.png',
    '09n':'http://openweathermap.org/img/wn/09n@4x.png',
    '10d':'http://openweathermap.org/img/wn/10d@4x.png',
    '10n':'http://openweathermap.org/img/wn/10n@4x.png',
    '11d':'http://openweathermap.org/img/wn/11d@4x.png',
    '11n':'http://openweathermap.org/img/wn/11n@4x.png',
    '13d':'http://openweathermap.org/img/wn/13d@4x.png',
    '13n':'http://openweathermap.org/img/wn/13n@4x.png',
    '50d':'http://openweathermap.org/img/wn/50d@4x.png',
    '50n':'http://openweathermap.org/img/wn/50n@4x.png',
    
}