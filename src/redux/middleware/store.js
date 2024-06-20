import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import eventReducer from '../reducers/eventReducer';
import cartReducer from '../reducers/cartReducer';
import supplierReducer from '../reducers/supplierReducer1';
import userReducer from '../reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = {
  event: persistReducer(persistConfig, eventReducer),
  cart: persistReducer(persistConfig, cartReducer),
  supplier: persistReducer(persistConfig, supplierReducer),
  user: persistReducer(persistConfig, userReducer),
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
