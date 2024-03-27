import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';
import cartReducer from '../reducers/cartReducer';
import supplierReducer from '../reducers/supplierReducer1';

const store = configureStore({
  reducer: {
    event: eventReducer,
    cart: cartReducer,
    supplier1: supplierReducer,
  },
});

export default store;
