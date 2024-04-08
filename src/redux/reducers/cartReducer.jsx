import { ADD_TO_CART, DECREMENT, INCREMENT, REMOVE_FROM_CART } from "../actions/cart";

const initialState = {
    items: [],
}

const cartRedcuer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                // If item already exists, update its quantity
                const updatedItems = [...state.items]; 
                updatedItems[existingItemIndex].quantity += 1;
                return {
                    ...state,
                    items: updatedItems,
                };
            } else {
                // If item is not in the cart, add it
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case INCREMENT:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    } else {
                        return item
                    }
                })
            };
        case DECREMENT:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
                        }
                    } else {
                        return item
                    }
                })
            };
        default:
            return state;
    }
};


export default cartRedcuer;