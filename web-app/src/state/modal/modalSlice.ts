import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalSlice } from './types';

const initialState: ModalSlice = {
	open: false,
	type: "",
};

const modalSlice = createSlice({
	name: "openModal",
	initialState,
	reducers: {
		openModal(state, action:PayloadAction<string>) {
			state.type = action.payload;
			state.open = true;
		},
		closeModal(state) {
			state.open = false;
		},
	},
});

export const { 
	openModal, 
	closeModal, 
} = modalSlice.actions;

export default modalSlice.reducer;
