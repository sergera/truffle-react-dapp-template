import * as connectionThunks from '../../connection/thunks';
import { 
	initialState,
	connectAccount, 
	accountSwitched,
	setAccountListeners 
} from '.';
import { 
	providerDisconnected 
} from '../provider';

import { 
	getNewStore 
} from '../../../../test';
import {
	requestAccounts,
} from '../../../../blockchain/metamask'

/* mock functions to be mocked */
/* mock functions that use window.ethereum so that error isn't thrown on access */
/* mock all used functions in mocked modules so that error isn't thrown on access */
jest.mock("../../../../blockchain/metamask", () => ({
	__esModule: true,
	requestAccounts: jest.fn(),
	setAccountSwitchCallback: jest.fn(),
}));

const mockRequestAccounts = requestAccounts as jest.Mock;

/* declare mock return variables */

const fakeAddress = "fake address";
const fakeAccounts = [fakeAddress];

/* test */

let store = getNewStore();

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

describe("accountSwitched", () => {
	test("should set new values and call checkConnection", async () => {
		const checkConnectionSpy = jest.spyOn(connectionThunks, "checkConnection");

		mockRequestAccounts.mockImplementation(() => fakeAccounts);

		await store.dispatch(accountSwitched());
		expect(checkConnectionSpy).toBeCalled();

		let account = store.getState().account;
		expect(account.address).toEqual(fakeAccounts[0]);
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
