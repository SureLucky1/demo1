import { createSlice } from "@reduxjs/toolkit";
import { allChProducts } from "../../../data";

const initialTotal = parseFloat(localStorage.getItem("totalValue")) || 0;

let initialState = {
  currency: 1,
  quantity:0,
  total: initialTotal,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    addPrice: (state, action) => {
      const { productId} = action.payload;
      return {
        ...state,
        total: state.total + Number.parseFloat(Math.floor((Number(allChProducts.All[productId - 1].price ) * state.currency))* (state.quantity +1)) ,
      };
    },
    subtractPrice: (state, action) => {
      const { productId} = action.payload;
      return {
        ...state,
        total: state.total - Number.parseFloat(Math.floor((Number(allChProducts.All[productId - 1].price )* state.currency))*  (state.quantity +1)) ,
      };
    },
    clearTotal: (state) => {
      return {
        ...state,
        total: 0,
      };
    },
    setCurrency: (state, action) => {
      return {
        ...state,
        currency: action.payload,
        total: state.total * action.payload,
      };
    },
  },
});

export default priceSlice.reducer;
export const { addPrice, subtractPrice, clearTotal, setCurrency } = priceSlice.actions;