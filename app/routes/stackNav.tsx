import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../views/HomeScreen/homeScreen";

import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
const StackNav = () =>{
    return(
        <NavigationContainer>        
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
        </NavigationContainer>

    )
}
export default StackNav;    