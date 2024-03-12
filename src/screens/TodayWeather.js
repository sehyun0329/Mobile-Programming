import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

/* eslint-disable */

export default function TodayWeather() {
  const apikey = "716c47e2c90efc483ed87e9eed3490dd";

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

  //api를 활용한 지정한 도시의 날씨 data를 구하는 method

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

  //미래 날씨 data를 3시간 단위로 가져오는 url
  getJSON(
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apikey +
      "&units=metric",
    function (err, data) {
      if (err !== null) {
        alert("예상치 못한 오류 발생2." + err);
      } else {
        loadForecastWeather(data);
      }
    }
  );

  function loadForecastWeather(data) {
    settime0(data.list[0].dt_txt);
    settemp0(data.list[0].main.temp);
    seticon0(data.list[0].weather[0].icon);
    setdhumidity0(data.list[0].main.humidity);

    settime1(data.list[1].dt_txt);
    settemp1(data.list[1].main.temp);
    seticon1(data.list[1].weather[0].icon);
    setdhumidity1(data.list[1].main.humidity);

    settime2(data.list[2].dt_txt);
    settemp2(data.list[2].main.temp);
    seticon2(data.list[2].weather[0].icon);
    setdhumidity2(data.list[2].main.humidity);

    settime3(data.list[3].dt_txt);
    settemp3(data.list[3].main.temp);
    seticon3(data.list[3].weather[0].icon);
    setdhumidity3(data.list[3].main.humidity);

    settime4(data.list[4].dt_txt);
    settemp4(data.list[4].main.temp);
    seticon4(data.list[4].weather[0].icon);
    setdhumidity4(data.list[4].main.humidity);

    settime5(data.list[5].dt_txt);
    settemp5(data.list[5].main.temp);
    seticon5(data.list[5].weather[0].icon);
    setdhumidity5(data.list[5].main.humidity);

    settime6(data.list[6].dt_txt);
    settemp6(data.list[6].main.temp);
    seticon6(data.list[6].weather[0].icon);
    setdhumidity6(data.list[6].main.humidity);
  }

  const [time0, settime0] = useState("none");
  const [temp0, settemp0] = useState("none");
  const [icon0, seticon0] = useState("04d");
  const [humidity0, setdhumidity0] = useState("none");

  const [time1, settime1] = useState("none");
  const [temp1, settemp1] = useState("none");
  const [icon1, seticon1] = useState("04d");
  const [humidity1, setdhumidity1] = useState("none");

  const [time2, settime2] = useState("none");
  const [temp2, settemp2] = useState("none");
  const [icon2, seticon2] = useState("04d");
  const [humidity2, setdhumidity2] = useState("0");

  const [time3, settime3] = useState("none");
  const [temp3, settemp3] = useState("none");
  const [icon3, seticon3] = useState("04d");
  const [humidity3, setdhumidity3] = useState("0");

  const [time4, settime4] = useState("none");
  const [temp4, settemp4] = useState("none");
  const [icon4, seticon4] = useState("04d");
  const [humidity4, setdhumidity4] = useState("0");

  const [time5, settime5] = useState("none");
  const [temp5, settemp5] = useState("none");
  const [icon5, seticon5] = useState("04d");
  const [humidity5, setdhumidity5] = useState("0");

  const [time6, settime6] = useState("none");
  const [temp6, settemp6] = useState("none");
  const [icon6, seticon6] = useState("04d");
  const [humidity6, setdhumidity6] = useState("0");

  const Uri0 = "http://openweathermap.org/img/wn/" + icon0 + "@2x.png";

  const WeatherForecastItem = ({ Uri, time, temp, humidity }) => {
    return (
      <View style={styles.forecastView}>
        <Image
          style={styles.forecastimg}
          source={{
            uri: Uri,
          }}
        />
        <Text>
          {time.substr(10, 15)} {temp}°C {humidity}%
        </Text>
      </View>
    );
  };
  return (
    <View>
      <WeatherForecastItem
        Uri={"http://openweathermap.org/img/wn/" + icon0 + "@2x.png"}
        time={time0}
        temp={temp0}
        humidity={humidity0}
      ></WeatherForecastItem>

      <WeatherForecastItem
        Uri={"http://openweathermap.org/img/wn/" + icon1 + "@2x.png"}
        time={time1}
        temp={temp1}
        humidity={humidity1}
      ></WeatherForecastItem>

      <WeatherForecastItem
        Uri={"http://openweathermap.org/img/wn/" + icon2 + "@2x.png"}
        time={time2}
        temp={temp2}
        humidity={humidity2}
      ></WeatherForecastItem>

      <WeatherForecastItem
        Uri={"http://openweathermap.org/img/wn/" + icon3 + "@2x.png"}
        time={time3}
        temp={temp3}
        humidity={humidity3}
      ></WeatherForecastItem>

      <WeatherForecastItem
        Uri={"http://openweathermap.org/img/wn/" + icon4 + "@2x.png"}
        time={time4}
        temp={temp4}
        humidity={humidity4}
      ></WeatherForecastItem>

      <WeatherForecastItem
        Uri={"http://openweathermap.org/img/wn/" + icon5 + "@2x.png"}
        time={time5}
        temp={temp5}
        humidity={humidity5}
      ></WeatherForecastItem>

      <WeatherForecastItem
        Uri={"http://openweathermap.org/img/wn/" + icon6 + "@2x.png"}
        time={time6}
        temp={temp6}
        humidity={humidity6}
      ></WeatherForecastItem>

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

  currentimg: {
    width: 150,
    height: 100,
  },
  forecastimg: {
    width: 50,
    height: 100,
    marginRight: 10,
  },
  forecastView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
