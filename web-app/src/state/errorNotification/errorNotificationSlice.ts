import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ErrorNotificationSlice } from './errorNotificationSlice.types';

export const initialState: ErrorNotificationSlice = {
	message: "",
};

const errorNotificationSlice = createSlice({
	name: "errorNotification",
	initialState,
	reducers: {
		openErrorNotification(state, action:PayloadAction<string>) {
			state.message = action.payload;
		},
		closeErrorNotification(state) {
			state.message = "";
		},
	},
});

export const { 
	openErrorNotification,
	closeErrorNotification,
} = errorNotificationSlice.actions;

export default errorNotificationSlice.reducer;
