import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Setting = () => {
    return (
        <View style={styles.center}>
            <Text>Setting</Text>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})