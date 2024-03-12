import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';
import cartReducer from '../reducers/cartReducer';

const store = configureStore({
  reducer: {
    event: eventReducer,
    cart: cartReducer,
  },
});

export default store;