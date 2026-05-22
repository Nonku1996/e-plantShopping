import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array [cite: 229]
  },
  reducers: {
    // Adds a new plant item to the items array [cite: 229]
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    // Removes an item from the cart based on its name 
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    // Updates the quantity of a specific item in the cart [cite: 237]
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update to the new amount provided in the payload [cite: 240]
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;