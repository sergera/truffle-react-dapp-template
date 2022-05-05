import { getNewStore } from '../../test';

import { openSuccessNotification, closeSuccessNotification, openInfoNotification, 
closeInfoNotification, openWarningNotification, closeWarningNotification, 
openErrorNotification, closeErrorNotification, initialState } from './notificationSlice';

import { NOTIFICATION_TYPES } from '../../constants';

import { Store } from '../store';

const successNotificationItem1 = {
	type: NOTIFICATION_TYPES.success,
	message: "test success message 1",
};

const successNotificationItem2 = {
	type: NOTIFICATION_TYPES.success,
	message: "test success message 2",
};

const infoNotificationItem1 = {
	type: NOTIFICATION_TYPES.info,
	message: "test info message 1",
};

const infoNotificationItem2 = {
	type: NOTIFICATION_TYPES.info,
	message: "test info message 2",
};

const warningNotificationItem1 = {
	type: NOTIFICATION_TYPES.warning,
	message: "test warning message 1",
};

const warningNotificationItem2 = {
	type: NOTIFICATION_TYPES.warning,
	message: "test warning message 2",
};

const errorNotificationItem1 = {
	type: NOTIFICATION_TYPES.error,
	message: "test error message 1",
};

const errorNotificationItem2 = {
	type: NOTIFICATION_TYPES.error,
	message: "test error message 2",
};

let store:Store = getNewStore();

beforeEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().notification;
	expect(state).toEqual(initialState);
});

test("should add notification to notifications on open", () => {
	expect(store.getState().notification.queue).toEqual([]);
	store.dispatch(openSuccessNotification(successNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([successNotificationItem1]);
	store.dispatch(openErrorNotification(errorNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([successNotificationItem1,errorNotificationItem1]);
});

test("should remove notification from notifications on close", () => {
	expect(store.getState().notification.queue).toEqual([]);
	store.dispatch(openSuccessNotification(successNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([successNotificationItem1]);
	store.dispatch(openErrorNotification(errorNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([successNotificationItem1,errorNotificationItem1]);
	store.dispatch(closeSuccessNotification());
	expect(store.getState().notification.queue).toEqual([errorNotificationItem1]);
	store.dispatch(closeErrorNotification());
	expect(store.getState().notification.queue).toEqual([]);
});

test("should remove first notification of type from notifications on close", () => {
	expect(store.getState().notification.queue).toEqual([]);
	store.dispatch(openSuccessNotification(successNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1
	]);
	store.dispatch(openInfoNotification(infoNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1
	]);
	store.dispatch(openWarningNotification(warningNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		warningNotificationItem1
	]);
	store.dispatch(openErrorNotification(errorNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		warningNotificationItem1,
		errorNotificationItem1
	]);
	store.dispatch(openSuccessNotification(successNotificationItem2.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		warningNotificationItem1,
		errorNotificationItem1,
		successNotificationItem2
	]);
	store.dispatch(openInfoNotification(infoNotificationItem2.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		warningNotificationItem1,
		errorNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2
	]);
	store.dispatch(openWarningNotification(warningNotificationItem2.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		warningNotificationItem1,
		errorNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2,
		warningNotificationItem2
	]);
	store.dispatch(openErrorNotification(errorNotificationItem2.message));
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		warningNotificationItem1,
		errorNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2,
		warningNotificationItem2,
		errorNotificationItem2
	]);
	store.dispatch(closeWarningNotification());
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		errorNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2,
		warningNotificationItem2,
		errorNotificationItem2
	]);	
	store.dispatch(closeWarningNotification());
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		infoNotificationItem1,
		errorNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2,
		errorNotificationItem2
	]);	
	store.dispatch(closeInfoNotification());
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		errorNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2,
		errorNotificationItem2
	]);	
	store.dispatch(closeErrorNotification());
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2,
		errorNotificationItem2
	]);	
	store.dispatch(closeErrorNotification());
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem1,
		successNotificationItem2,
		infoNotificationItem2,
	]);	
	store.dispatch(closeSuccessNotification());
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem2,
		infoNotificationItem2,
	]);	
	store.dispatch(closeInfoNotification());
	expect(store.getState().notification.queue).toEqual([
		successNotificationItem2,
	]);	
	store.dispatch(closeSuccessNotification());
	expect(store.getState().notification.queue).toEqual([]);
});

test("should not remove an item on close if there is no notification of type on notifications", () => {
	expect(store.getState().notification.queue).toEqual([]);
	store.dispatch(openSuccessNotification(successNotificationItem1.message));
	expect(store.getState().notification.queue).toEqual([successNotificationItem1]);
	store.dispatch(closeErrorNotification());
	expect(store.getState().notification.queue).toEqual([successNotificationItem1]);
});
