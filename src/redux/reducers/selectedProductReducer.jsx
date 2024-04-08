import { SELECTED_PRODUCT } from "../actions/productDetail";

const initialState = {
    products: [],
}

const SelectedProductReducer = () => {
    switch (state = initialState, action) {
        case SELECTED_PRODUCT:
            return action.payload;
        default:
            return state;
    }
}

export default SelectedProductReducer;