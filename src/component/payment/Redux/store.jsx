import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./cartSlice copy";
import priceSlice from "./priceSlice";
const store = configureStore({
reducer: {
cart: cartSlice,
price: priceSlice
}
})
export default store