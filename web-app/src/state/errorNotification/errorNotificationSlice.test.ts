import getNewStore from '../../utils/test/getNewStore';

import { openErrorNotification, closeErrorNotification, initialState } from './errorNotificationSlice';

let store = getNewStore();

const testMessage = "test message";

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().errorNotification;
	expect(state).toEqual(initialState);
});

test("should set message on open", () => {
	store.dispatch(openErrorNotification(testMessage));
	expect(store.getState().errorNotification.message).toEqual(testMessage);
});

test("should clear message on close", () => {
	store.dispatch(openErrorNotification(testMessage));
	expect(store.getState().errorNotification.message).toEqual(testMessage);
	store.dispatch(closeErrorNotification());
	expect(store.getState().errorNotification.message).toEqual("");
});
