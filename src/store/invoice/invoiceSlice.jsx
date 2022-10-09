import { createSlice } from "@reduxjs/toolkit";
import dummyData from "./dummy";

const initialState = {
  menuIsOpen: false,
  edit: { status: false, id: null },
  invoices: [...dummyData],
  filter: [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    SET_MENU_OPEN(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    SET_EDIT(state, { payload }) {
      state.edit = { ...payload };
    },
    SET_FILTER(state, { payload }) {
      state.filter = payload;
    },
    NEW_INVOICE(state, { payload }) {
      state.invoices.push(payload);
    },
    UPDATE_INVOICE(state, { payload }) {
      state.invoices.splice(payload.index, 1, { ...payload.newInvoice });
    },
    DELETE_INVOICE(state, { payload }) {
      state.invoices.splice(payload, 1);
    },
    MARK_PAID(state, { payload }) {
      state.invoices[payload].status = "Paid";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_MENU_OPEN,
  SET_EDIT,
  SET_FILTER,
  NEW_INVOICE,
  UPDATE_INVOICE,
  MARK_PAID,
  DELETE_INVOICE,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
