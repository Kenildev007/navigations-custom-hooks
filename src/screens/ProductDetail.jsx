import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cart';
import { gql, useQuery } from '@apollo/client';

const GET_SINGLE_PRODUCT_DETAILS = gql`
    query GetSingleProductDetails($id : ID){
        product(id: $id){
            id
            availableForSale
            title
            description
            featuredImage{
                id
                url
            }
            compareAtPriceRange{
                maxVariantPrice{
                    amount
                }
                minVariantPrice{
                    amount
                }
            }
            options{
                id
                name
                values
            }
            priceRange{
                maxVariantPrice{
                    amount
                }
                minVariantPrice{
                    amount
                }
            }
            variants(first: 150) {
                edges {
                    node {
                    title
                    availableForSale
                    id
                    selectedOptions {
                        name
                        value
                        }
                    compareAtPrice{
                            amount
                            currencyCode
                        }
                    price {
                        amount
                        currencyCode
                        }
                    }
                }
            }
        }
    }
`;

const ProductDetail = ({ route, navigation }) => {
    const productId = route.params?.product?.node?.id;
    const product = route.params;
    console.log(productId, 'productID');
    const dispatch = useDispatch();

    const [selectedOptions, setSelectedOptions] = useState({});
    const [isAvailable, setIsAvailable] = useState();
    const [selectedVariantPrice, setSelectedVariantPrice] = useState();

    const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT_DETAILS, {
        variables: {
            id: productId
        }
    })
    console.log(data, 'SingleProduct Data');


    // useEffect to select defult values
    useEffect(() => {
        if (data && data.product && data.product.options) {
            const defaultSelectedValues = {};
            data.product.options.forEach(option => {
                defaultSelectedValues[option.name] = option.values[0];
            });
            setSelectedOptions(defaultSelectedValues);
            console.log(defaultSelectedValues, 'defaultSelectedValues');
        }
    }, [data]);

    // full variant node with id after selecting the values
    const selectedVariant = data?.product?.variants?.edges
        .filter(edge => edge?.node?.selectedOptions
            .filter(option => selectedOptions[option.name] === option?.value)
            .length == data?.product?.options.length)[0];

    // print the selected variants node
    const variantId = selectedVariant
    console.log(variantId, "variant ndoeid");
    

    // useEffect for variant prie and availability
    useEffect(() => {
        if(selectedOptions) {
            setIsAvailable(selectedVariant?.node?.availableForSale);
            setSelectedVariantPrice(selectedVariant?.node?.price);
            console.log('price of selected variant' , selectedVariantPrice);
            console.log('available for sale ' , isAvailable);
        } 
    }, [data, selectedOptions, isAvailable]);

    const handleSelectedOptions = (optionName, value) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionName]: value
        }))
    };
    console.log(selectedOptions, 'Selected Options');

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        navigation.navigate('Cart');
        console.log('helllo i m clicked');
    };

    return (
        <>
            <View style={styles.main}>
                <ScrollView>
                    <Image
                        style={styles.Image}
                        src={data?.product?.featuredImage?.url}
                    />
                    <Text style={styles.title}>{data?.product?.title}</Text>
                    <Text style={styles.title}>${product.price}</Text>

                    {data?.product?.options.map((option) => (
                        <View key={option.name}>
                            <Text style={styles.optionName}>{option.name}</Text>

                            <View style={styles.values}>
                                {option.values.map((value) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.valueTouchable,
                                            value === selectedOptions[option.name] ? styles.selectedValue : null
                                        ]}
                                        key={value}
                                        onPress={() => handleSelectedOptions(option.name, value)}
                                    >
                                        <Text style={styles.valueText}>{value}</Text>
                                    </TouchableOpacity>

                                ))}
                            </View>

                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity disabled={!isAvailable}  onPress={() => handleAddToCart()} style={[styles.addToCart, !isAvailable ? {opacity :0.7} : {opacity: 1}]}>
                    <Text style={styles.btnText}>
                        Add To Cart
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!isAvailable} onPress={() => handleAddToCart()} style={[styles.buyNow, !isAvailable ? {opacity :0.7} : {opacity: 1}]}>
                    <Text style={styles.btnText}>
                        Buy Now
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ProductDetail;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    Image: {
        width: "80%",
        height: 300,
        resizeMode: 'contain',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderColor: '#000000',
        margin: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginHorizontal: 10,
        marginVertical: 4,
    },
    counter: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 8
    },
    optionName: {
        marginHorizontal: 10,
        fontFamily: 'Formula1-Bold',
    },
    values: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 5,
    },
    valueTouchable: {
        marginHorizontal: 3,
        marginVertical: 3,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    selectedValue: {
        marginHorizontal: 3,
        marginVertical: 3,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        backgroundColor: 'red',
    },
    valueText: {
        fontFamily: 'PPNeueMachina_ Light',
        fontSize: 15,
        color: '#000000',
        marginHorizontal: 10,
        marginVertical: 2,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    addToCart: {
        backgroundColor: '#FFEBB2',
        padding: 10,
        width: '49%',
        borderRadius: 10,
    },
    buyNow: {
        backgroundColor: '#E59BE9',
        padding: 10,
        width: '49%',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'PPNeueMachina_ Light'
    },
})