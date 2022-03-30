import getNewStore from '../../../test/getNewStore';
import { isChainSupported, getChainName } from '../../../blockchain/chains';
import * as contracts from '../../../blockchain/contracts';

import { initialState } from './chainSlice';
import { connectChain, requestChainSwitch, chainSwitched, setChainListeners } from './thunks';
import { providerDisconnected } from '../provider/thunks';

declare var window: any;

let store = getNewStore();

jest.mock('../../../blockchain/chains', () => ({
	__esModule: true,
	isChainSupported: jest.fn(),
	getChainName: jest.fn(),
}));

const mockIsChainSupported = isChainSupported as jest.Mock;
const mockGetChainName = getChainName as jest.Mock;

const fakeChainIdInt = "0";
const fakeChainIdHex = "0x0";
const fakeChainName = "fake chain name";

afterEach(() => {
	store = getNewStore();
	delete window.ethereum;
});

test("should set initial state", () => {
	const state = store.getState().chain;
	expect(state).toEqual(initialState);
});

describe("connectChain", () => {
	test("should open modal if chain is not supported", async () => {
		window.ethereum = { request: () => fakeChainIdHex };

		mockIsChainSupported.mockImplementation(() => false);

		await store.dispatch(connectChain());
		expect(store.getState().modal.type).toEqual("SELECT_CHAIN");
		expect(store.getState().chain.isPermitted).toEqual(false);
	});

	test("should not call setContracts if chain is not supported", async () => {
		window.ethereum = { request: () => fakeChainIdHex };

		mockIsChainSupported.mockImplementation(() => false);

		const setContractsSpy = jest.spyOn(contracts, "setContracts");

		await store.dispatch(chainSwitched());
		expect(setContractsSpy).not.toBeCalled();
		expect(store.getState().modal.type).toEqual("SELECT_CHAIN");
		expect(store.getState().chain.isPermitted).toEqual(false);
	});
	
	test("should set chain ok if chain is supported", async () => {
		window.ethereum = { request: () => fakeChainIdHex	};

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		await store.dispatch(connectChain());
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});

	test("should call setContracts if chain is supported", async () => {
		window.ethereum = { request: () => fakeChainIdHex	};

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		const setContractsSpy = jest.spyOn(contracts, "setContracts");

		await store.dispatch(chainSwitched());
		expect(setContractsSpy).toBeCalled();
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});
});

describe("requestChainSwitch", () => {
	test("should request ethereum provider", async () => {
		window.ethereum = { request: () => null	};

		const requestSpy = jest.spyOn(window.ethereum, "request");

		await store.dispatch(requestChainSwitch(fakeChainIdHex));
		expect(requestSpy).toBeCalledWith({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: fakeChainIdHex }],
		});
	});
});

describe("chainSwitched", () => {
	test("should call deleteContracts and set new chain info", async () => {
		window.ethereum = { request: () => fakeChainIdHex	};

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		const deleteContractsSpy = jest.spyOn(contracts, "deleteContracts");

		await store.dispatch(chainSwitched());
		expect(deleteContractsSpy).toBeCalled();
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});
});

describe("setChainListeners", () => {
	test("should set listeners flag to true", async () => {
		window.ethereum = {	on: () => null };
		
		await store.dispatch(setChainListeners());
		expect(store.getState().chain.listenersSet).toEqual(true);
	});
});

test("should reset state if provider disconnected", async () => {
	window.ethereum = { request: () => fakeChainIdHex	};

	mockIsChainSupported.mockImplementation(() => true);
	mockGetChainName.mockImplementation(() => fakeChainName);

	await store.dispatch(connectChain());
	expect(store.getState().chain.id).toEqual(fakeChainIdInt);
	expect(store.getState().chain.name).toEqual(fakeChainName);
	expect(store.getState().chain.isPermitted).toEqual(true);

	await store.dispatch(providerDisconnected());
	expect(store.getState().chain).toEqual(initialState);
});
