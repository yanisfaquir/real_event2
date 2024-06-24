// src/reducers/serviceResultReducer.js
import { createSlice } from '@reduxjs/toolkit';

const serviceResultSlice = createSlice({
  name: 'serviceResult',
  initialState: {
    selectedService: null,
    supplierId: '',
    title: '',
    description: '',
    price: '',
    address: '',
    num_customers: 0,
    photo: '',
    status: '',
  },
  reducers: {
    setFiltroPreco: (state, action) => {
      state.filters.preco = action.payload;
    },
    setFiltroTipoEspaco: (state, action) => {
      state.filters.tipoEspaco = action.payload;
    },
    selectService: (state, action) => {
      state.selectedService = action.payload;
    },
    setSupplierId: (state, action) => {
      state.supplierId = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setNumCustomers: (state, action) => {
      state.num_customers = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  setFiltroPreco,
  setFiltroTipoEspaco,
  selectService,
  setSupplierId,
  setTitle,
  setDescription,
  setPrice,
  setAddress,
  setNumCustomers,
  setPhoto,
  setStatus,
} = serviceResultSlice.actions;

export default serviceResultSlice.reducer;
