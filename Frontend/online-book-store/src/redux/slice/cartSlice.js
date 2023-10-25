import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCart: (state, action) => {
      state.cartData = action.payload;
    },
    saveCartItem: (state, action) => {
      state.cartData = [...state.cartData, action.payload];
    },
    updateCartItem: (state, action) => {
      const updatedBookIndex = state.cartData.findIndex((item) => {
        if (item.book._id === action.payload.book._id) {
          return item;
        }
      });

      if (updatedBookIndex !== -1) {
        state.cartData[updatedBookIndex] = action.payload;
      }
    },
    deleteCartItem: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.book._id !== action.payload.book._id
      );
    },
    emptyCart: (state) => {
      state.cartData = [];
    },
  },
});

export const {
  saveCart,
  saveCartItem,
  updateCartItem,
  deleteCartItem,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
