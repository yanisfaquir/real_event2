// src/reducers/serviceResultReducer.js
import { createSlice } from '@reduxjs/toolkit';

const serviceResultSlice = createSlice({
  name: 'serviceResult',
  initialState: {
    serviceType: ['Catering', 'Local', 'Bar'],
    filters: {
      preco: '',
      tipoEspaco: '',
    },
    selectedService: null,
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
  },
});

export const { setFiltroPreco, setFiltroTipoEspaco, selectService } = serviceResultSlice.actions;
export default serviceResultSlice.reducer;
