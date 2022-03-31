import { getNewStore } from '../../../test';

import { initialState } from '.';
import { connectAccount, setAccountListeners} from '.';
import { providerDisconnected } from '../provider';

declare var window: any;

let store = getNewStore();

const fakeAddress = "fake address";
const fakeAccounts = [fakeAddress];

afterEach(() => {
	store = getNewStore();
	delete window.ethereum;
});

test("should set initial state", () => {
	const state = store.getState().account;
	expect(state).toEqual(initialState);
});

describe("connectAccount", () => {
	test("should set address", async () => {
		window.ethereum = { request: () => fakeAccounts };

		await store.dispatch(connectAccount());
		expect(store.getState().account.address).toEqual(fakeAddress);
	});
});

describe("setAccountListeners", () => {
	test("should set listeners flag to true", async () => {
		window.ethereum = {	on: () => null };
		
		await store.dispatch(setAccountListeners());
		expect(store.getState().account.listenersSet).toEqual(true);
	});
});

test("should reset state if provider disconnected", async () => {
	window.ethereum = { request: () => fakeAccounts };

	await store.dispatch(connectAccount());
	expect(store.getState().account.address).toEqual(fakeAddress);

	await store.dispatch(providerDisconnected());
	expect(store.getState().account).toEqual(initialState);
});
