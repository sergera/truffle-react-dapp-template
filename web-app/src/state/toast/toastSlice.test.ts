import { getNewStore } from '../../test';

import { openSuccessToast, closeSuccessToast, openErrorToast, closeErrorToast, initialState } from './toastSlice';

import { TOAST_TYPES } from '../../constants';

import { Store } from '../store';

const successToastItem1 = {
	type: TOAST_TYPES.success,
	message: "test success message 1",
};

const errorToastItem1 = {
	type: TOAST_TYPES.error,
	message: "test error message 1",
};

const successToastItem2 = {
	type: TOAST_TYPES.success,
	message: "test success message 2",
};

const errorToastItem2 = {
	type: TOAST_TYPES.error,
	message: "test error message 2",
};

const successToastItemWithoutMessage = {
	type: TOAST_TYPES.success,
	message: "",
};

const errorToastItemWithoutMessage = {
	type: TOAST_TYPES.error,
	message: "",
};

let store:Store = getNewStore();

beforeEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().toast;
	expect(state).toEqual(initialState);
});

test("should add toast to toasts on open", () => {
	expect(store.getState().toast.queue).toEqual([]);
	store.dispatch(openSuccessToast(successToastItem1.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1]);
	store.dispatch(openErrorToast(errorToastItem1.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1,errorToastItem1]);
});

test("should remove toast from toasts on close", () => {
	expect(store.getState().toast.queue).toEqual([]);
	store.dispatch(openSuccessToast(successToastItem1.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1]);
	store.dispatch(openErrorToast(errorToastItem1.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1,errorToastItem1]);
	store.dispatch(closeSuccessToast());
	expect(store.getState().toast.queue).toEqual([errorToastItem1]);
	store.dispatch(closeErrorToast());
	expect(store.getState().toast.queue).toEqual([]);
});

test("should remove first toast of type from toasts on close", () => {
	expect(store.getState().toast.queue).toEqual([]);
	store.dispatch(openSuccessToast(successToastItem1.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1]);
	store.dispatch(openErrorToast(errorToastItem1.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1,errorToastItem1]);
	store.dispatch(openSuccessToast(successToastItem2.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1,errorToastItem1,successToastItem2]);
	store.dispatch(openErrorToast(errorToastItem2.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1,errorToastItem1,successToastItem2,errorToastItem2]);
	store.dispatch(closeErrorToast());
	expect(store.getState().toast.queue).toEqual([successToastItem1,successToastItem2,errorToastItem2]);
	store.dispatch(closeSuccessToast());
	expect(store.getState().toast.queue).toEqual([successToastItem2,errorToastItem2]);
	store.dispatch(closeErrorToast());
	expect(store.getState().toast.queue).toEqual([successToastItem2]);
	store.dispatch(closeSuccessToast());
	expect(store.getState().toast.queue).toEqual([]);
});

test("should accept toasts with no message and set message to empty string", () => {
	expect(store.getState().toast.queue).toEqual([]);
	store.dispatch(openSuccessToast());
	expect(store.getState().toast.queue).toEqual([successToastItemWithoutMessage]);
	store.dispatch(openErrorToast());
	expect(store.getState().toast.queue).toEqual([successToastItemWithoutMessage,errorToastItemWithoutMessage]);
	store.dispatch(closeErrorToast());
	expect(store.getState().toast.queue).toEqual([successToastItemWithoutMessage]);
	store.dispatch(closeSuccessToast());
	expect(store.getState().toast.queue).toEqual([]);
});

test("should not remove an item on close if there is no toast of type on toasts", () => {
	expect(store.getState().toast.queue).toEqual([]);
	store.dispatch(openSuccessToast(successToastItem1.message));
	expect(store.getState().toast.queue).toEqual([successToastItem1]);
	store.dispatch(closeErrorToast());
	expect(store.getState().toast.queue).toEqual([successToastItem1]);
});
