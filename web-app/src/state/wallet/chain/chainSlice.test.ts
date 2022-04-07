import * as metamask from '../../../blockchain/metamask'
import * as contracts from '../../../blockchain/contracts/contracts';
import { 
	getNewStore 
} from '../../../test';
import { 
	isChainSupported, 
	getChainName 
} from '../../../blockchain/chains';

import { 
	initialState, 
	connectChain, 
	switchChain, 
	chainSwitched, 
	setChainListeners 
} from '.';
import { 
	providerDisconnected 
} from '../provider';

/* silence logger */
jest.mock("../../../logger", () => ({
	__esModule: true,
	log: jest.fn(),
}));

jest.mock("../../../blockchain/metamask", () => ({
	__esModule: true,
	isConnected: jest.fn(),
	requestChainId: jest.fn(),
	requestChainSwitch: jest.fn(),
	setChainSwitchCallback: jest.fn(),
}));

const mockIsConnected = metamask.isConnected as jest.Mock;
const mockRequestChainId = metamask.requestChainId as jest.Mock;

jest.mock('../../../blockchain/chains', () => ({
	__esModule: true,
	isChainSupported: jest.fn(),
	getChainName: jest.fn(),
}));

const mockIsChainSupported = isChainSupported as jest.Mock;
const mockGetChainName = getChainName as jest.Mock;

let store = getNewStore();

const fakeChainIdInt = "0";
const fakeChainIdHex = "0x0";
const fakeChainName = "fake chain name";

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().chain;
	expect(state).toEqual(initialState);
});

describe("connectChain", () => {
	test("should open modal if chain is not connected", async () => {
		mockIsConnected.mockImplementation(() => false);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);

		mockIsChainSupported.mockImplementation(() => true);

		await store.dispatch(connectChain());
		expect(store.getState().modal.type).toEqual("NOT_CONNECTED");
		expect(store.getState().chain.isConnected).toEqual(false);	
		expect(store.getState().chain.isPermitted).toEqual(true);	
	});

	test("should open modal if chain is not supported", async () => {
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);

		mockIsChainSupported.mockImplementation(() => false);

		await store.dispatch(connectChain());
		expect(store.getState().modal.type).toEqual("SELECT_CHAIN");
		expect(store.getState().chain.isConnected).toEqual(true);	
		expect(store.getState().chain.isPermitted).toEqual(false);
	});

	test("should not call setContracts if chain is not supported", async () => {
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);

		mockIsChainSupported.mockImplementation(() => false);

		const setContractsSpy = jest.spyOn(contracts, "setContracts");

		await store.dispatch(chainSwitched());
		expect(setContractsSpy).not.toBeCalled();
		expect(store.getState().modal.type).toEqual("SELECT_CHAIN");
		expect(store.getState().chain.isConnected).toEqual(true);	
		expect(store.getState().chain.isPermitted).toEqual(false);
	});
	
	test("should set chain ok if chain is supported and connected", async () => {
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		await store.dispatch(connectChain());
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isConnected).toEqual(true);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});

	test("should call setContracts if chain is supported", async () => {
		mockIsConnected.mockImplementation(() => false);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		const setContractsSpy = jest.spyOn(contracts, "setContracts");

		await store.dispatch(chainSwitched());
		expect(setContractsSpy).toBeCalled();
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isConnected).toEqual(false);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});
});

describe("switchChain", () => {
	test("should request metamask module", async () => {
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);

		const requestChainSwitchSpy = jest.spyOn(metamask, "requestChainSwitch");

		await store.dispatch(switchChain(fakeChainIdHex));
		expect(requestChainSwitchSpy).toBeCalledWith(fakeChainIdHex);
	});
});

describe("chainSwitched", () => {
	test("should call deleteContracts and set new chain info", async () => {
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		const deleteContractsSpy = jest.spyOn(contracts, "deleteContracts");

		await store.dispatch(chainSwitched());
		expect(deleteContractsSpy).toBeCalled();
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isConnected).toEqual(true);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});
});

describe("setChainListeners", () => {
	test("should set listeners flag to true", async () => {
		await store.dispatch(setChainListeners());
		expect(store.getState().chain.listenersSet).toEqual(true);
	});
});

test("should reset state if provider disconnected", async () => {
	mockIsConnected.mockImplementation(() => true);
	mockRequestChainId.mockImplementation(() => fakeChainIdHex);

	mockIsChainSupported.mockImplementation(() => true);
	mockGetChainName.mockImplementation(() => fakeChainName);

	await store.dispatch(connectChain());
	expect(store.getState().chain.id).toEqual(fakeChainIdInt);
	expect(store.getState().chain.name).toEqual(fakeChainName);
	expect(store.getState().chain.isConnected).toEqual(true);
	expect(store.getState().chain.isPermitted).toEqual(true);

	await store.dispatch(providerDisconnected());
	expect(store.getState().chain).toEqual(initialState);
});
