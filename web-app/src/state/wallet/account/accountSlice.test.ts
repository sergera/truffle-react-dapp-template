import { 
	getNewStore 
} from '../../../test';

import {
	requestAccounts,
} from '../../../blockchain/metamask'

import { 
	initialState,
	connectAccount, 
	setAccountListeners 
} from '.';
import { 
	providerDisconnected 
} from '../provider';

jest.mock("../../../blockchain/metamask", () => ({
	__esModule: true,
	requestAccounts: jest.fn(),
	setAccountSwitchCallback: jest.fn(),
}));
const mockRequestAccounts = requestAccounts as jest.Mock;

let store = getNewStore();

const fakeAddress = "fake address";
const fakeAccounts = [fakeAddress];

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().account;
	expect(state).toEqual(initialState);
});

describe("connectAccount", () => {
	test("should set address", async () => {
		mockRequestAccounts.mockImplementation(() => fakeAccounts);

		await store.dispatch(connectAccount());
		expect(store.getState().account.address).toEqual(fakeAddress);
	});
});

describe("setAccountListeners", () => {
	test("should set listeners flag to true", async () => {
		await store.dispatch(setAccountListeners());
		expect(store.getState().account.listenersSet).toEqual(true);
	});
});

test("should reset state if provider disconnected", async () => {
	mockRequestAccounts.mockImplementation(() => fakeAccounts)

	await store.dispatch(connectAccount());
	expect(store.getState().account.address).toEqual(fakeAddress);

	await store.dispatch(providerDisconnected());
	expect(store.getState().account).toEqual(initialState);
});
