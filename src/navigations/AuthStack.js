import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, SignUp, LoginSuccess } from "../screens";
import { theme } from "../theme";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
        cardStyle: { backgroundColor: theme.background },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="LoginSuccess"
        component={LoginSuccess}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
