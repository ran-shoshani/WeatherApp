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
import { CurrentRenderContext } from "@react-navigation/native";

const WeatherDetails = ({ navigation, route }) => {
  // destruxture the item from params
  const { lat, lon } = route.params.item.coord;
  //const

  const image = require("../styles/frog1.jpg");

  // states
  const [currentWeather, setCurrentWeather] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecase, setDailyForecast] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherDescription, setWeatherDescription] = useState();
  const [weatherMain, setWeatherMain] = useState();
  const [currentDateTime, setCurrentDateTime] = useState();
  
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

        const { description, icon, id, main } =
          response.data.current.weather[0];
        setWeatherDescription(description);
        setWeatherMain(main);

        const { dt, sunrise, sunset, temp, humidity, clouds, uvi } =
          response.data.current;


        // setCurrentDateTime(dt);
        console.log(" time date1: ", dt);
        var unix_timestamp = dt;
        console.log(" time date2: ", unix_timestamp);
        var date = new Date(unix_timestamp * 1000);

        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months[date.getMonth()];
        var day = date.getDate();
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        
        // Will display time in 10:30:23 format
        var formattedTime = day + ' ' + month + ' ' + hours + ':' + minutes.substr(-2) ;
        setCurrentDateTime(formattedTime);
        console.log(" time date3: ", currentDateTime);
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
        <View style={styles.title1}>
          <Text>Weather Details</Text>
          
        </View>

        <View style={styles.containerRow}>
          <View style={styles.info}>
            <Text style={styles.text}>{weatherDescription} </Text>
            <Text style={styles.text}>
              feel like{currentWeather.feels_like}°
            </Text>
            <WeatherIcons icon={weatherIcon} />
          </View>

          <View style={styles.info}>
            <Text style={styles.text2}>CURRENTLY</Text>
            <Text style={styles.text}>{currentWeather.temp}°</Text>
          </View>
        </View>

        {/* time and date */}
        <View style={styles.text2}>
          <Text>{currentDateTime}</Text>
        </View>

        <View style={styles.text3}>
          <Text style={styles.text}>Latitude:{lat}</Text>
          <Text style={styles.text}>Longitude:{lon}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    marginTop: 30,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  text2: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 10,
    width: "80%",
    padding: 10,
  },
  containerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  title1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    //backgroundColor: "lightblue",
  },
  image: {
    flex: 1,
    //justifyContent: "center",
  },
});
