import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import * as Location from "expo-location";
import { Icon } from "react-native-elements";
import moment from "moment";

const screenWidth = Dimensions.get("window").width;

function WeeklyWeather({ weather }) {
  const iconNames = {
    //"d" 로 끝나는 아이콘 이름은 낮에 해당하는 날씨 조건이다.
    "01d": "weather-sunny",
    "02d": "weather-partly-cloudy",
    "03d": "cloud",
    "04d": "weather-cloudy",
    "09d": "weather-rainy",
    "10d": "weather-pouring",
    "11d": "weather-lightning",
    "13d": "weather-snowy",
    "50d": "weather-fog",
    //"n" 으로 끝나는 아이콘 이름은 밤에 해당하는 날씨 조건이다.
    "01n": "weather-sunny",
    "02n": "weather-partly-cloudy",
    "03n": "cloud",
    "04n": "weather-cloudy",
    "09n": "weather-rainy",
    "10n": "weather-pouring",
    "11n": "weather-lightning",
    "13n": "weather-snowy",
    "50n": "weather-fog",
  };

  const items = weather.filter((item, index) => index < 7); // 7개의 요소만 필터링

  // 각 요일별로 정보를 출력합니다.
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View
          style={[
            styles.item,
            index === 0 && styles.firstItem, // 첫 번째 아이템에 대한 스타일 추가
          ]}
          key={index}
        >
          <Text style={styles.date}>
            {moment()
              .add(index + 1, "days")
              .format("M/D")}
          </Text>
          <Icon
            name={iconNames[item.weather[0].icon]}
            type="material-community"
            size={30}
          />
          <Text style={styles.temp}>{Math.round(item.main.temp)}°</Text>
          <Text style={styles.text}>{item.weather[0].main}</Text>
          <Text style={styles.description}>{item.weather[0].description}</Text>
        </View>
      ))}
    </View>
  );
}

export default function WeeklyWeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  const fetchWeatherData = async () => {
    if (!location) {
      return;
    }

    const { latitude, longitude } = location.coords;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f5cde2b6c0919c951809000b74d10ec8&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>
              {weatherData.city.name}, {weatherData.city.country}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.weatherContainer}
            horizontal
          >
            <WeeklyWeather weather={weatherData.list} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.header}>
          <Text style={styles.title}>Weekly Weather</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#BFCFFF",
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    paddingBottom: 10,
  },
  weatherContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  date: {
    flex: 1,
    fontSize: 18,
    fontWeight: "400",
    color: "#333",
  },
  temp: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
    marginRight: 10,
  },
  description: {
    fontSize: 13,
    fontWeight: "400",
    color: "#333",
  },
  firstItem: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
