import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData: null, initialized: false };

export const authSlice = createSlice({
  name: "userAuth",
  initialState,

  reducers: {
    SET_INITIALIZED(state, { payload }) {
      state.initialized = payload;
    },
    CREATE_USER(state, { payload }) {
      state.userData = payload.user;
    },
    LOGIN(state, { payload }) {
      state.userData = payload.user;
    },
    LOGOUT(state, action) {
      state.userData = null;
    },
    SET_USER_DATA(state, { payload }) {
      state.userData = { ...state.userData, ...payload.userData };
    },
  },
});

export const { SET_INITIALIZED, CREATE_USER, LOGIN, LOGOUT, SET_USER_DATA } =
  authSlice.actions;

//   fetch async data from firebase using Redux Thunks

export default authSlice.reducer;
