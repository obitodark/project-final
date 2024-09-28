import type { Category, Modal, Products } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Modal = {
  modals: {
    modalProduct: {
      state: false,
      value: "CREATE",
      data: undefined,
    },
    modalCategory: {
      state: false,
      value: "CREATE",
      data: undefined,
    },
    modalSubcategory: {
      state: false,
      value: "CREATE",
      data: undefined,
    },
    modalBrand: {
      state: false,
      value: "CREATE",
      data: undefined,
    },
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ name: keyof Modal['modals']; value?: "CREATE" | "UPDATE"; data?: any }>) => {
      const { name, value = "CREATE", data } = action.payload;
      if (state.modals[name]) {
        state.modals[name].state = true;
        state.modals[name].value = value;
        state.modals[name].data = data;
      }
    },

    closeModal: (state, action: PayloadAction<keyof Modal['modals']>) => {
      const modalName = action.payload;
      if (state.modals[modalName]) {
        state.modals[modalName].state = false;
        state.modals[modalName].data = undefined;
      }
    },

    toggleModal: (state, action: PayloadAction<{ name: keyof Modal['modals']; value?: "CREATE" | "UPDATE" }>) => {
      const { name, value = "CREATE" } = action.payload;
      if (state.modals[name]) {
        state.modals[name].state = !state.modals[name].state;
        state.modals[name].value = value;
      }
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
