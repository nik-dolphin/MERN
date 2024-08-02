import { combineReducers } from "redux";
import { cartData } from "./reducer";
import { productData } from "./reducers/productReducer";

export default combineReducers({ cartData, productData });
