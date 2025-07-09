// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Try to get the user object from localStorage
const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user, // user is either the parsed object or null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
