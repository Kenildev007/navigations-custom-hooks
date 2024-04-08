import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Splash from '../screens/Splash'
import ProductDetail from '../screens/ProductDetail'
import Cart from '../screens/Cart'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigation = () => {
    return (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>
    )
};

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{headerShown:false}} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;

const styles = StyleSheet.create({})