import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../redux/actions/cart';

const Counter = ({ count,productId }) => {

    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment(productId));
    }

    const handleDecrement = () => {
        dispatch(decrement(productId));
    }


    return (
        <View style={styles.counter}>
            <TouchableOpacity onPress={handleDecrement}>
                <Text style={styles.title}><Icon name="minuscircle" size={20} /></Text>
            </TouchableOpacity>
            <Text>{count}</Text>
            <TouchableOpacity onPress={handleIncrement}>
                <Text style={styles.title}><Icon name="pluscircle" size={20} /></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    counter: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,

    },
};

export default Counter;
