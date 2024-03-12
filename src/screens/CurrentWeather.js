import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* eslint-disable */
export default function CurrentWeather() {
  const apikey = "716c47e2c90efc483ed87e9eed3490dd";

  //현재(current) 날씨 data에 관한 변수들
  //도시이름
  const [name, setname] = useState("none");
  //현재온도
  const [temperature, settemperature] = useState(0);

  function get() {
    return temperature;
  }
  //바람세기
  const [windspeed, setwindspeed] = useState(0);
  //날씨영어설명
  const [description, setdescription] = useState("none");
  //체감온도
  const [feels_like, setfeels_like] = useState(0);
  //최저기온
  const [temp_min, settemp_min] = useState(0);
  //최고기온
  const [temp_max, settemp_max] = useState(0);
  //습도
  const [humidity, sethumidity] = useState(0);
  //아이콘ID
  const [IconID, setIconID] = useState("none");

  //위도, 경도
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);

  //위도,경도를 구하는 method

  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setlatitude(latitude);
    setlongitude(longitude);
  };

  useEffect(() => {
    ask();
  }, []);

  //도시의 날씨 data를 api를 통해 구하는 method

  const getJSON = function (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      const status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };
  //현재 날씨 data를 가져오는 url
  getJSON(
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apikey +
      "&units=metric",
    function (err, data) {
      if (err !== null) {
        alert("예상치 못한 오류 발생1." + err);
      } else {
        loadCurrentWeather(data);
        const temp_avg = (data.main.temp_min + data.main.temp_max) / 2;
        storeData(temp_avg);
      }
    }
  );
  // 조예랑 수정
  // Recommend에서 temp_avg 읽을 수 있도록 AsyncStorage 이용해서 @storage_Key라는 키에 데이터 저장
  const storeData = async (value) => {
    try {
      const stringValue = value.toString();
      console.log("Storing:", stringValue);
      await AsyncStorage.setItem("@storage_Key", stringValue);
      console.log("Stored value:", stringValue);
    } catch (e) {
      console.error("Error storing data:", e);
    }
  };

  useEffect(() => {
    if (weatherData && weatherData.main) {
      const temp_avg =
        (weatherData.main.temp_min + weatherData.main.temp_max) / 2;
      storeData(temp_avg);
    }
  }, [weatherData]);

  const [weatherData, setWeatherData] = useState(null);
  // 여기까지
  function loadCurrentWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, temp_min, temp_max, humidity } = data.main;
    const { speed } = data.wind;
    console.log((temp_min + temp_max) / 2);

    setname(name);
    settemperature(temp);
    setwindspeed(speed);
    setfeels_like(feels_like);
    settemp_min(temp_min);
    settemp_max(temp_max);
    sethumidity(humidity);
    setIconID(icon);
    setdescription(description);
  }
  const Uri = "http://openweathermap.org/img/wn/" + IconID + "@2x.png";

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>{name}</Text>
      <Text></Text>
      <Image
        style={styles.currentimg}
        source={{
          uri: Uri,
        }}
      />
      <Text style={styles.Text}>{description}</Text>
      <Text style={styles.Text}>{temperature}°C</Text>

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>

      <Text style={styles.TitleText}>날씨정보</Text>
      <Text></Text>
      <Text></Text>

      <Text style={styles.Text}>체감온도 : {feels_like}°C</Text>
      <Text style={styles.Text}>최저기온 : {temp_min}°C</Text>
      <Text style={styles.Text}>최고기온 : {temp_max}°C</Text>
      <Text style={styles.Text}>습도 : {humidity}%</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderText: {
    fontSize: 28,
    fontWeight: "300",
  },
  Text: {
    fontSize: 15,
    fontWeight: "300",
  },
  TitleText: {
    fontSize: 20,
    fontWeight: "300",
  },
  currentimg: {
    width: 150,
    height: 100,
  },
});
