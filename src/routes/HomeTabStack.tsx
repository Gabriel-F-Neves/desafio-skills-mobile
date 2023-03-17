import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { NavigationContainer } from "@react-navigation/native";

function HomeTabStack() {
    const Stack = createStackNavigator();

    return(
        <>
            <Stack.Navigator
            initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </>
    )
}
export function Routes() {
    return (
      <>  
        <NavigationContainer>
          <HomeTabStack />
         </NavigationContainer>
      </>
    );
  }