import { createSlice } from "@reduxjs/toolkit";
// import firebase from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { addDoc, collection, query, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";

const initialState = { userData: null, initialized: false, errors: {} };

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
    SET_ERROR(state, { payload }) {
      state.errors = { ...state.errors, ...payload };
    },
  },
});

export const {
  SET_INITIALIZED,
  CREATE_USER,
  LOGIN,
  LOGOUT,
  SET_USER_DATA,
  SET_ERROR,
} = authSlice.actions;

//   fetch async data from firebase using Redux Thunks

export const setAuthListener = () => (dispatch, state) => {
  onAuthStateChanged(auth, (user) => {
    if (user && !state().userAuth.initialized) {
      dispatch(LOGIN({ user: auth.currentUser.toJSON() }));
      dispatch(getUser());

      !state().userAuth.initialized && dispatch(SET_INITIALIZED(true));
    }
  });
};

export const login =
  ({ email, password }) =>
  async (dispatch, state) => {
    await signInWithEmailAndPassword(auth, email, password);

    dispatch(LOGIN({ user: auth.currentUser.toJSON() }));
    dispatch(getUser());

    return state().userAuth.userData;
  };

export const logOut = () => async (dispatch, state) => {
  await signOut(auth);
  dispatch(LOGOUT());
};

export const getUser = () => async (dispatch, state) => {
  let userData = null;
  const uid = auth.currentUser.uid;

  // query user data
  const qry = query(collection(db, "users", uid));
  const querySnapshot = await getDoc(qry);

  console.log(querySnapshot);
  // if (response.exists) {
  //   userData = {
  //     id: response.id,
  //     ...response.data(),
  //   };
  // }

  // // update store
  // dispatch(SET_USER_DATA({ userData }));
  // return state().userAuth.userData;
};

export const createUser =
  ({ username, email, password }) =>
  async (dispatch, state) => {
    try {
      // create auth user
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // add user to user collection
      const uid = auth.currentUser.uid;
      console.log(response);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          id: uid,
          email: response.user.email,
          username,
        });
        console.log(docRef);
        // update store
        dispatch(CREATE_USER({ user: auth.currentUser.toJSON() }));
        const userData = {
          ...auth.currentUser.toJSON(),
          id: uid,
          email: response.user.email,
          username,
        };
        dispatch(SET_USER_DATA({ userData }));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      let message = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = `${email} is already in use.`;
          console.log(message);
          break;
        case "auth/invalid-email":
          message = `Invalid email address`;
          console.log(`Invalid email address`);
          break;
        case "auth/operation-not-allowed":
          message = `Error during sign up`;
          console.log(`Error during sign up`);
          break;
        default:
          console.log(error.message);
          break;
      }
      dispatch(SET_ERROR({ signup: message }));
    }
  };

// The function below allows us to select a value from the state
export const selectUser = (state) => {
  return state.userAuth.userData;
};

export default authSlice.reducer;
