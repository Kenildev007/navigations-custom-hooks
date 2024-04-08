export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const increment = (productId) => ({
    type: INCREMENT,
    payload: productId,
})
export const decrement = (productId) => ({
    type: DECREMENT,
    payload: productId,
})
export const addToCart = (productId ) => ({
    type: ADD_TO_CART,
    payload: productId,
})
export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
})