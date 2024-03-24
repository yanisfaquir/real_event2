import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedService: null,
  errorMessage: '',
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    setSelectedService(state, action) {
      state.selectedService = action.payload;
      state.errorMessage = '';
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setSelectedService, setErrorMessage } = supplierSlice.actions;
export default supplierSlice.reducer;
