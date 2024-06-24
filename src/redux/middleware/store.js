// src/redux/middleware/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import serviceResultReducer from '../reducers/serviceResultReducer';
import eventReducer from '../reducers/eventReducer';
import cartReducer from '../reducers/cartReducer';
import supplierReducer from '../reducers/supplierReducer1';
import userReducer from '../reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  event: persistReducer(persistConfig, eventReducer),
  serviceResult: persistReducer(persistConfig, serviceResultReducer),
  cart: persistReducer(persistConfig, cartReducer),
  supplier: persistReducer(persistConfig, supplierReducer),
  user: persistReducer(persistConfig, userReducer),
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
