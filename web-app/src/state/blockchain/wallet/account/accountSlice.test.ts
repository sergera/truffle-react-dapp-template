import * as connectionThunks from '../../connection/thunks';
import { initialState, connectAccount, accountSwitched,	setAccountListeners } from '.';
import { providerDisconnected } from '../provider';

import { getNewStore } from '../../../../test';
import { metamask } from '../../../../blockchain/metamask'

/* silence logger */
jest.mock("../../../../logger");

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
		metamask.requestAccounts = async () => fakeAccounts;

		await store.dispatch(connectAccount());
		expect(store.getState().account.address).toEqual(fakeAddress);
	});
});

describe("accountSwitched", () => {
	test("should set new values and call checkConnection", async () => {
		const checkConnectionSpy = jest.spyOn(connectionThunks, "checkConnection");

		metamask.requestAccounts = async () => fakeAccounts;

		await store.dispatch(accountSwitched());
		expect(checkConnectionSpy).toBeCalled();

		let account = store.getState().account;
		expect(account.address).toEqual(fakeAccounts[0]);
	});
});

describe("setAccountListeners", () => {
	test("should set listeners flag to true", async () => {
		metamask.setAccountSwitchCallback = () => null;

		await store.dispatch(setAccountListeners());
		expect(store.getState().account.listenersSet).toEqual(true);
	});
});

test("should reset state if provider disconnected", async () => {
	metamask.requestAccounts = async () => fakeAccounts;

	await store.dispatch(connectAccount());
	expect(store.getState().account.address).toEqual(fakeAddress);

	await store.dispatch(providerDisconnected());
	expect(store.getState().account).toEqual(initialState);
});
