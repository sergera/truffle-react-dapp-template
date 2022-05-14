import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ToastSlice } from './toastSlice.types';

import { TOAST_TYPES } from '../../constants';

export const initialState: ToastSlice = {
	queue: [],
};

const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		openSuccessToast(state:ToastSlice, {payload=""}:PayloadAction<string|undefined>) {
			let newToasts = [...state.queue];
			newToasts.push({ type: TOAST_TYPES.success, message: payload });
			state.queue = newToasts;
		},
		closeSuccessToast(state:ToastSlice) {
			let toastToClose = state.queue.findIndex((toast) => toast.type === TOAST_TYPES.success);
			let newToasts = state.queue.filter((_,index) => index !== toastToClose);
			state.queue = newToasts;
		},
		openInfoToast(state:ToastSlice, {payload=""}:PayloadAction<string>) {
			let newToasts = [...state.queue];
			newToasts.push({ type: TOAST_TYPES.info, message: payload });
			state.queue = newToasts;
		},
		closeInfoToast(state:ToastSlice) {
			let toastToClose = state.queue.findIndex((toast) => toast.type === TOAST_TYPES.info);
			let newToasts = state.queue.filter((_,index) => index !== toastToClose);
			state.queue = newToasts;
		},
		openWarningToast(state:ToastSlice, {payload=""}:PayloadAction<string>) {
			let newToasts = [...state.queue];
			newToasts.push({ type: TOAST_TYPES.warning, message: payload });
			state.queue = newToasts;
		},
		closeWarningToast(state:ToastSlice) {
			let toastToClose = state.queue.findIndex((toast) => toast.type === TOAST_TYPES.warning);
			let newToasts = state.queue.filter((_,index) => index !== toastToClose);
			state.queue = newToasts;
		},
		openErrorToast(state:ToastSlice, {payload=""}:PayloadAction<string|undefined>) {
			let newToasts = [...state.queue];
			newToasts.push({ type: TOAST_TYPES.error, message: payload });
			state.queue = newToasts;
		},
		closeErrorToast(state:ToastSlice) {
			let toastToClose = state.queue.findIndex((toast) => toast.type === TOAST_TYPES.error);
			let newToasts = state.queue.filter((_,index) => index !== toastToClose);
			state.queue = newToasts;
		},
	},
});

export const { 
	openSuccessToast,
	closeSuccessToast,
	openInfoToast,
	closeInfoToast,
	openWarningToast,
	closeWarningToast,
	openErrorToast,
	closeErrorToast,
} = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
