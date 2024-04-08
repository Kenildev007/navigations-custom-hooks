import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './BottomTab/Dashboard';
import Cart from './Cart';
// import Setting from './BottomTab/Setting';

const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
            <Tab.Screen name="Cart" component={Cart} options={{headerShown:false}}  />
        </Tab.Navigator>
    )
}

export default Home

const styles = StyleSheet.create({
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeff'
    },
    touchable: {
        padding: 10,
        margin: 10,
        width: 150,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'salmon',
    }
})