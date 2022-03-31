import { getNewStore } from '../../test';

import { openModal, closeModal, initialState } from './modalSlice';

let store = getNewStore();

const testType = "test type";

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().modal;
	expect(state).toEqual(initialState);
});

test("should set type on open", () => {
	store.dispatch(openModal(testType));
	expect(store.getState().modal.type).toEqual(testType);
});

test("should clear type on close", () => {
	store.dispatch(openModal(testType));
	expect(store.getState().modal.type).toEqual(testType);
	store.dispatch(closeModal());
	expect(store.getState().modal.type).toEqual("");
});
