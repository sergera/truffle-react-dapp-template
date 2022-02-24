import { createSlice } from '@reduxjs/toolkit';

const initialState:boolean = false;

interface Action {
	type: string,
};

const modalSlice = createSlice({
	name: "openModal",
	initialState,
	reducers: {
		toggleModal(state, action:Action) {
			return !state;
		},
		openModal(state, action:Action) {
			return true;
		},
		closeModal(state, action:Action) {
			return false;
		}
	}
});

export const { toggleModal, openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
