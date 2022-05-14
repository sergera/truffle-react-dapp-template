import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NotificationSlice } from './notificationSlice.types';

import { NOTIFICATION_TYPES } from '../../constants';

export const initialState: NotificationSlice = {
	queue: [],
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		openSuccessNotification(state:NotificationSlice, action:PayloadAction<string>) {
			let newNotifications = [...state.queue];
			newNotifications.push({ type: NOTIFICATION_TYPES.success, message: action.payload });
			state.queue = newNotifications;
		},
		closeSuccessNotification(state:NotificationSlice) {
			let notificationToClose = state.queue.findIndex((notification) => notification.type === NOTIFICATION_TYPES.success);
			let newNotifications = state.queue.filter((_,index) => index !== notificationToClose);
			state.queue = newNotifications;
		},
		openInfoNotification(state:NotificationSlice, action:PayloadAction<string>) {
			let newNotifications = [...state.queue];
			newNotifications.push({ type: NOTIFICATION_TYPES.info, message: action.payload });
			state.queue = newNotifications;
		},
		closeInfoNotification(state:NotificationSlice) {
			let notificationToClose = state.queue.findIndex((notification) => notification.type === NOTIFICATION_TYPES.info);
			let newNotifications = state.queue.filter((_,index) => index !== notificationToClose);
			state.queue = newNotifications;
		},
		openWarningNotification(state:NotificationSlice, action:PayloadAction<string>) {
			let newNotifications = [...state.queue];
			newNotifications.push({ type: NOTIFICATION_TYPES.warning, message: action.payload });
			state.queue = newNotifications;
		},
		closeWarningNotification(state:NotificationSlice) {
			let notificationToClose = state.queue.findIndex((notification) => notification.type === NOTIFICATION_TYPES.warning);
			let newNotifications = state.queue.filter((_,index) => index !== notificationToClose);
			state.queue = newNotifications;
		},
		openErrorNotification(state:NotificationSlice, action:PayloadAction<string>) {
			let newNotifications = [...state.queue];
			newNotifications.push({ type: NOTIFICATION_TYPES.error, message: action.payload });
			state.queue = newNotifications;
		},
		closeErrorNotification(state:NotificationSlice) {
			let notificationToClose = state.queue.findIndex((notification) => notification.type === NOTIFICATION_TYPES.error);
			let newNotifications = state.queue.filter((_,index) => index !== notificationToClose);
			state.queue = newNotifications;
		},
	},
});

export const {
	openSuccessNotification,
	closeSuccessNotification,
	openInfoNotification,
	closeInfoNotification,
	openWarningNotification,
	closeWarningNotification,
	openErrorNotification,
	closeErrorNotification,
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
