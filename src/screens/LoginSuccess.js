import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrentWeather from "./CurrentWeather";
import TodayWeather from "./TodayWeather";
import WeeklyWeatherScreen from "./WeeklyWeatherScreen";
import OutfitRecommendation from "./OutfitRecommendation";

const LoginSuccess = ({ route }) => {
  const { userEmail } = route.params;
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Current Weather"
        component={CurrentWeather}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="weather-sunny" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Today Weather"
        component={TodayWeather}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="weather-partly-cloudy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Weekly Weather"
        component={WeeklyWeatherScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="weather-cloudy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="recommend clothes"
        component={OutfitRecommendation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LoginSuccess;
