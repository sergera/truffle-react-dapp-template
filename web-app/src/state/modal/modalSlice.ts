import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalSlice } from './modalSlice.types';

export const initialState: ModalSlice = {
	type: "",
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal(state, action:PayloadAction<string>) {
			state.type = action.payload;
		},
		closeModal(state) {
			state.type = "";
		},
	},
});

export const { 
	openModal, 
	closeModal, 
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
