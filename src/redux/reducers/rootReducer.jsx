import { combineReducers } from "redux";
import cartRedcuer from "./cartReducer";

const rootReducer = combineReducers({
    cart: cartRedcuer,
})

export default rootReducer;