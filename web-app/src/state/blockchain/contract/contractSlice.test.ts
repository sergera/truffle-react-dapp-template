import { setContractAcquired,	initialState } from '.';

import { getNewStore } from '../../../test';

let store = getNewStore();

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().contract;
	expect(state).toEqual(initialState);
});

describe("setContractAcquired", () => {
	test("should set acquired boolean", () => {
		store.dispatch(setContractAcquired(true));
		expect(store.getState().contract.acquired).toEqual(true);
		store.dispatch(setContractAcquired(false));
		expect(store.getState().contract.acquired).toEqual(false);
	});
});
