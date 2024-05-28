// import { USER_LOGIN, USER_LOGOUT } from '../actions/userAction';

// const initialState = {
//   user: null,
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_LOGIN:
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case USER_LOGOUT:
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;

// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     },
//     clearUserOnRehydrate: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { login, logout, clearUserOnRehydrate } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    /**
     * @param state
     * @param action
     */
    login: (state, action) => {
      state.user = action.payload;
    },

    /**
     * @param state O estado atual do usuário.
     */
    logout: (state) => {
      state.user = null;
    },

    /**
     * @param state O estado atual do usuário.
     */
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, clearUser } = userSlice.actions;

export default userSlice.reducer;