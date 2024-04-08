import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import Counter from '../components/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../redux/actions/cart'

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (item) => {
        console.log('handleRemoveFromCart');
        dispatch(removeFromCart(item))
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity) , 0);

    return (
        <ScrollView>
            <View>
                <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
                {cartItems.length === 0 ? (
                    <Text style={styles.emptyCartText}>Cart is empty</Text>
                ) : (
                    cartItems.map((item, index) => (
                        <View key={index} style={styles.cartItemContainer}>
                            <View>
                                <Image style={styles.imageContainer} src={item.image} />
                            </View>
                            <View>
                                <View style={styles.detailsLine}>
                                    <Text style={styles.titleText}>{item.title}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                                        <Icon name="delete" size={20} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.price}>${item.price}</Text>
                                <Counter count={item.quantity} productId={item.id} />
                            </View>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    )
}

export default Cart

const styles = StyleSheet.create({
    emptyCartText:{
        fontSize: 40,
        textAlign: 'center',
        color: '#000000',
    },
    totalPrice: {
        marginTop: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'right',
        justifyContent: 'center',
    },
    cartItemContainer: {
        height: '100%',
        width: '95%',
        padding: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        margin: 8,
        flex: 1
    },
    imageContainer: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    detailsLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        paddingHorizontal: 10,
        backgroundColor: '#C8sFFE0',
    },
    titleText: {
        width: '85%',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
        paddingHorizontal: 10,
        marginTop: 15
    },
    counter: {
        fontSize: 15,
        color: '#000',
        paddingHorizontal: 5,
        marginTop: 15
    }
})