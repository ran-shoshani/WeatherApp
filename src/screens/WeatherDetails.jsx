import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import API_CALL from "../utils/clientSecrets/openWeather";
import WeatherIcons from "../components/weatherDetails/WeatherIcons";

const WeatherDetails = ({ navigation, route }) => {
  // destruxture the item from params
  const { lat, lon } = route.params.item.coord;
  //const

  const image = require("../styles/blur-background.jpeg");

  // states
  const [currentWeather, setCurrentWeather] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecase, setDailyForecast] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState();
  // hooks
  const handleHeaderPress = () => {
    console.log("Header button pressed");
    navigation.navigate(ROUTES.PROFILE);
  };

  // const { main: { temp , temp_min, temp_max }, weather: [details], name ,dt} = currentWeather;
  //   const { icon, main, description } = details;
  //const icon = currentWeather.icon;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleHeaderPress}>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: route.params.item.name,
    });
  }, [navigation]);

  useEffect(() => {
    console.log("route param item", route.params.item);

    let URL = `${API_CALL.BASE_ONE}lat=${lat}&lon=${lon}&exclude=alerts,minutely${API_CALL.UNIT}${API_CALL.KEY}`;
    axios
      .get(URL)
      .then((response) => {
        // get Current weather data
        setCurrentWeather(response.data.current);
        console.log("=================================");
        console.log("=========Current weather=========");
        console.log("Current weather: ", response.data.current);

        //console.log("@weatherDetails object tempeture :", response.data.current.temp);
        //console.log("@weatherDetails object feels like:", response.data.current.feels_like);

        // get Houlry weather data
        setHourlyForecast(response.data.hourly);
        // console.log("=================================");
        // console.log("=========Hourly Forecast=========");
        //console.log("Hourly Forecast: ", response.data.hourly);
        // get Daily weather data
        setDailyForecast(response.data.daily);
        // console.log("=================================");
        // console.log("=========Daily Forecast=========");
        // console.log("Daily Forecast: ", response.data.daily);

        setWeatherIcon(response.data.current.weather[0].icon);

        console.log("test weatherIcon: ", weatherIcon);
      })
      .catch((error) => {
        console.log("error @axios.get(): ", error);
      })
      .finally(() => {
        console.log("@weatherDetails axios.get finally");
      });
  }, []);

  // functions

  return (
    <View style={styles.background}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
        <View style={styles.content}>
          <Text style={styles.title}>Weather Details</Text>
          <View style={styles.textView}>
            <View>
              <Text style={styles.text}>Latitude:{lat}</Text>
              <Text style={styles.text}>Longitude:{lon}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.text}>temp:{currentWeather.temp}°</Text>
              <Text style={styles.text}>feel like:{currentWeather.feels_like}°</Text>
              <WeatherIcons icon={weatherIcon} />
            </View>

            <View></View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //display: "flex",
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space-between",
    //backgroundColor: "lightblue",
    //width: "100%",
    //fontSize: 20,
    //fontWeight: "bold",
  },
  content:{
    marginTop:30,
    color: "white",
  },
  textView: {
    width: "80%",
    padding: 10,
    
  },
  text:{
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  info: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "lightblue",
  },
  image: {
    flex: 1,
    //justifyContent: "center",
  },
});
