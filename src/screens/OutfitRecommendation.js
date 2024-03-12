import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { saveTouchableOpacityValue } from "../utils/firebase";

const CLOTHES = [
  {
    name: "민소매, 반팔, 반바지, 원피스",
    minTemp: 28,
    maxTemp: 40,
    image: require("../image/temp28.png"),
  },
  {
    name: "반팔, 얇은 셔츠, 반바지, 면바지",
    minTemp: 23,
    maxTemp: 27,
    image: require("../image/temp23.png"),
  },
  {
    name: "얇은 가디건, 긴팔, 면바지, 청바지",
    minTemp: 20,
    maxTemp: 22,
    image: require("../image/temp20.png"),
  },
  {
    name: "얇은 니트, 맨투맨, 가디건, 슬랙스",
    minTemp: 17,
    maxTemp: 19,
    image: require("../image/temp17.png"),
  },
  {
    name: "자켓, 가디건, 야상, 니트, 스타킹, 면바지",
    minTemp: 12,
    maxTemp: 16,
    image: require("../image/temp12.png"),
  },
  {
    name: "트렌치 코트, 자켓, 스타킹, 니트, 기모바지",
    minTemp: 9,
    maxTemp: 11,
    image: require("../image/temp9.png"),
  },
  {
    name: "코트, 가죽자켓, 히트텍, 기모 옷",
    minTemp: 5,
    maxTemp: 8,
    image: require("../image/temp5.png"),
  },
  {
    name: "패딩, 두꺼운 코트, 털장갑, 목도리",
    minTemp: -20,
    maxTemp: 4,
    image: require("../image/temp4.png"),
  },
];

const OutfitRecommendation = () => {
  //useState Hook 사용
  const [loading, setLoading] = useState(true);
  const [tempAvg, setTempAvg] = useState(null);
  const [recommendedClothes, setRecommendedClothes] = useState(null);

  //비동기 함수 생성
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      console.log("Loaded:", value);
      if (value !== null) {
        setTempAvg(parseFloat(value));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  // useEffect Hook 사용해서 getData 함수 호출
  useEffect(() => {
    getData();
  }, []);
  // tempAvg 값이 변할때마다 recommendClothes 함수 호출
  useEffect(() => {
    if (tempAvg !== null) {
      setRecommendedClothes(recommendClothes(tempAvg));
    }
  }, [tempAvg]);

  // cloth의 minTemp와 maxTemp 범위 안에 있는지 찾음
  function recommendClothes(currentTemp) {
    for (const cloth of CLOTHES) {
      if (currentTemp >= cloth.minTemp && currentTemp <= cloth.maxTemp) {
        return cloth;
      }
    }
    return null;
  }

  const windowWidth = useWindowDimensions().width;

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <View style={{ ...styles.recommend, width: windowWidth * 0.9 }}>
        <View style={styles.todayTemp}>
          <Text style={styles.tempText}>
            오늘의 기온 : {tempAvg.toFixed(2)}
            °C
          </Text>
        </View>
        <View style={styles.clothImage}>
          {recommendedClothes && (
            <Image
              source={recommendedClothes.image}
              style={{
                width: windowWidth * 0.7,
                height: (windowWidth * 0.7) / 3,
              }}
            />
          )}
        </View>
        <View style={styles.recommendText}>
          {recommendedClothes && (
            <>
              <Text style={styles.resultText}>
                {tempAvg.toFixed(2)} °C 에 추천하는 옷차림
              </Text>
              <Text style={styles.resultText}>{recommendedClothes.name}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.satisfaction}>
        <View>
          <Text style={styles.testQuestion}>적절한 옷 추천인가요?</Text>
        </View>
        <View style={{ ...styles.emoji, width: windowWidth * 0.9 }}>
          <TouchableOpacity
            onPress={() => {
              const value = "Good";
              saveTouchableOpacityValue(value, tempAvg);
            }}
          >
            <Image source={require("../image/good.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const value = "Soso";
              saveTouchableOpacityValue(value, tempAvg);
            }}
          >
            <Image source={require("../image/soso.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const value = "Bad";
              saveTouchableOpacityValue(value, tempAvg);
            }}
          >
            <Image source={require("../image/bad.png")} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoText}>
          <Text style={styles.infoText}>
            해당 만족도 평가를 반영해 {"\n"} 옷차림 추천 기능을 업데이트 할
            예정입니다.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#BFCFFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  recommend: {
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  todayTemp: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#FFFBE5",
  },
  tempText: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    padding: 3,
  },
  clothImage: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendText: {
    margin: 10,
  },
  resultText: {
    textAlign: "center",
    margin: 5,
    fontSize: 17,
  },
  emoji: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  infoText: {
    margin: 10,
    textAlign: "center",
  },
  satisfaction: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  testQuestion: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OutfitRecommendation;
