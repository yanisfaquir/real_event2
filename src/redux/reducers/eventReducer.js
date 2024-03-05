import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    location: '',
    mapImageUrl: null,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    sameDay: true,
    startEnd: { start: null, end: null },
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setMapImageUrl: (state, action) => {
      state.mapImageUrl = action.payload;
    },

    setStartActionDate: (state, action) => {
      const date = new Date(action.payload);
      if (!isNaN(date.getTime())) {
        state.startDate = date.toISOString();
      } else {
        console.error('String inválida para data');
      }
    },
    setStartActionTime: (state, action) => {
      const date = new Date(action.payload);
      if (!isNaN(date.getTime())) {
        state.startTime = date.toISOString();
      } else {
        console.error('String inválida para hora');
      }
    },
    setStartEnd: (state, action) => {
      state.startEnd = action.payload;
    },

    setEndActionDate: (state, action) => {
      const date = new Date(action.payload);
      if (!isNaN(date.getTime())) {
        state.endDate = date.toISOString();
      } else {
        console.error('String inválida para data');
      }
    },
    setEndActionTime: (state, action) => {
      const date = new Date(action.payload);
      if (!isNaN(date.getTime())) {
        state.endDate = date.toISOString();
      } else {
        console.error('String inválida para data');
      }
    },
    setActionSameDay: (state, action) => {
      state.sameDay = action.payload;
    },
  },
});

export const {
  setLocation,
  setMapImageUrl,
  setStartActionDate,
  setStartActionTime,
  setEndActionDate,
  setEndActionTime,
  setActionSameDay,
  setStartEnd,
} = eventSlice.actions;

export default eventSlice.reducer;
