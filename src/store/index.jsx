import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoice/invoiceSlice";
import authReducer from "./auth/userAuthSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    auth: authReducer,
  },
});
