import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
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
  const [dailyForecast, setDailyForecast] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherDescription, setWeatherDescription] = useState();
  const [weatherMain, setWeatherMain] = useState();
  const [currentDateTime, setCurrentDateTime] = useState();
  const [timeZone, setTimeZone] = useState();

  // hooks
  const handleHeaderPress = () => {
    console.log("Header button pressed");
    navigation.navigate(ROUTES.PROFILE);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <StatusBar
            translucent={true}
            backgroundColor="#539edd"
            barStyle="dark-content"
          />
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={handleHeaderPress}
          >
            <MaterialIcons name="account-circle" size={24} color="black" />
          </TouchableOpacity>
        </>
      ),
      title: "Weather Details",
      //title: route.params.item.name,
      headerStyle: {
        backgroundColor: "#529edd",
      },
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

        getTimeZoneCity(response.data.timezone);

        setTimeDate(dt);
      })
      .catch((error) => {
        console.log("error @axios.get(): ", error);
      })
      .finally(() => {
        console.log("@weatherDetails axios.get finally");
      });
  }, []);

  // functions

  const getTimeZoneCity = (value) => {
    let timeZoneArray = value.split("/");
    setTimeZone(timeZoneArray[1]);
  };

  const setTimeDate = (dt) => {
    // setCurrentDateTime(dt);
    console.log(" time date1: ", dt);
    var date = new Date(dt * 1000);

    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var month = months[date.getMonth()];
    var day = date.getDate();
    var dayOfWeek = WeekDays[date.getDay()];

    var suffix = getDaySuffix(day);
    
    var formattedTime = dayOfWeek + " " + day + suffix + " " + month;
    setCurrentDateTime(formattedTime);
    console.log("current time: ", currentDateTime);
  };

  const getDaySuffix = (day) => {
    let lastDigit = day % 10;
    console.log("last digit: ", lastDigit);
    switch (lastDigit) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
        <View style={styles.titleView}>
          <View>
            <Text style={styles.title}>{route.params.item.name}</Text>
          </View>
          <View>
            <Text style={styles.timeZone}>Time Zone: {timeZone}</Text>
          </View>
          {/* time and date */}
          <View>
            <Text style={styles.time}>{currentDateTime}</Text>
          </View>
        </View>

        <View style={styles.weatherInfo}>
          <View style={styles.tempInfo}>
            <Text style={styles.currentlyText}>CURRENTLY</Text>
            <Text style={styles.currentTemp}>
              {round(currentWeather.temp)}°
            </Text>

            <Text style={styles.tempLike}>Feels Like</Text>
            <Text style={styles.tempLike}>
              {round(currentWeather.feels_like)}°
            </Text>
          </View>

          <View style={styles.iconAndDescription}>
            <WeatherIcons icon={weatherIcon} />
            <Text style={styles.description}>{weatherDescription}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeatherDetails;

const round = (number) => {
  if(!number){
    return '-';
  }
  return Math.round(number * 10) / 10;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    alignItems: "center",
    //backgroundColor: "lightblue",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
  },
  timeZone: {
    fontSize: 14,
    fontWeight: "bold",
  },
  time:{
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    fontSize: 25,
    fontWeight: "bold",
  },
  currentTemp: {
    fontSize: 40,
    fontWeight: "bold",
  },
  currentlyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weatherInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    // borderWidth: 1,
    // borderRadius:5,
    // margin: 10,
  },
  iconAndDescription: {
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderRadius:5,
  },
  tempInfo: {
  alignItems: "flex-end",
  },
  tempLike: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    flex: 1,

    //justifyContent: "center",
  },
});
