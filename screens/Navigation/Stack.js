import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Home.js";
import Profile from "../Profile.js";
import CreateEmployee from "../CreateEmployee.js";

const Stack = createStackNavigator();

export default function MainStack() {
  const myOptions = {
    title: "Home Screen",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#006aff",
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: "Profile Screen" }}
        />
        <Stack.Screen
          name="CreateEmployee"
          component={CreateEmployee}
          options={{ ...myOptions, title: "Create Employee" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
