import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';

const store = configureStore({
  reducer: {
    event: eventReducer,
  },
});

export default store;