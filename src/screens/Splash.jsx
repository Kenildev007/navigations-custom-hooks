import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DrawerNavigation');
        }, 1500);
    }, []);
    return (
        <View style={styles.center}>
            <Text>Splash</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C8FFE0',
        color:'#85E6C5',
        fontSize: 20
    }
})