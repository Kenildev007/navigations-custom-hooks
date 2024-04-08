import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Profile = ({navigation}) => {
    const handleClick = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.center}>
        <Text>Profile Page</Text>
            <TouchableOpacity style={styles.touchable} onPress={handleClick}>
                <Text>Go To Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    touchable:{
        backgroundColor: 'salmon',
        padding: 10,
        margin: 10,
        width: 150,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})