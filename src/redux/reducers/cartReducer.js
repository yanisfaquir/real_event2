import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentSection: 1,
  },
  reducers: {
    setCurrentCartSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
});

export const { setCurrentCartSection } = cartSlice.actions;

export default cartSlice.reducer;
