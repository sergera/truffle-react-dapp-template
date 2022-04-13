import * as connectionThunks from '../../connection/thunks';
import { 
	initialState, 
	connectChain, 
	switchChain, 
	chainSwitched, 
	setChainListeners 
} from '.';
import { 
	providerDisconnected,
} from '../provider';

import { metamask }from '../../../../blockchain/metamask'
import * as contracts from '../../../../blockchain/contracts';
import { 
	getNewStore 
} from '../../../../test';
import { 
	isChainSupported, 
	getChainName 
} from '../../../../blockchain/chains';

/* silence logger */
jest.mock("../../../../logger", () => ({
	__esModule: true,
	log: jest.fn(),
}));

/* mock non-redux modules that will be spied on for import consistency */
jest.mock("../../../../blockchain/contracts", () => ({
	__esModule: true,
	setContracts: jest.fn(),
	deleteContracts: jest.fn(),
}));

/* mock functions to be mocked */
/* mock functions that use window.ethereum so that error isn't thrown on access */
/* mock all used functions in mocked modules so that error isn't thrown on access */
jest.mock("../../../../blockchain/chains", () => ({
	__esModule: true,
	isChainSupported: jest.fn(),
	getChainName: jest.fn(),
}));

const mockIsChainSupported = isChainSupported as jest.Mock;
const mockGetChainName = getChainName as jest.Mock;

/* declare mock return variables */
const fakeChainIdInt = "0";
const fakeChainIdHex = "0x0";
const fakeChainName = "fake chain name";

/* test */
let store = getNewStore();

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().chain;
	expect(state).toEqual(initialState);
});

describe("connectChain", () => {
	test("should open modal if chain is not connected", async () => {
		metamask.isConnected = () => false;
		metamask.requestChainId = async () => fakeChainIdHex;
		
		mockIsChainSupported.mockImplementation(() => true);

		await store.dispatch(connectChain());
		expect(store.getState().modal.type).toEqual("NOT_CONNECTED");
		expect(store.getState().chain.isConnected).toEqual(false);	
		expect(store.getState().chain.isPermitted).toEqual(true);	
	});

	test("should set isPermitted to false if chain is not supported", async () => {
		metamask.isConnected = () => true;
		metamask.requestChainId = async () => fakeChainIdHex;

		mockIsChainSupported.mockImplementation(() => false);

		await store.dispatch(connectChain());
		expect(store.getState().chain.isConnected).toEqual(true);	
		expect(store.getState().chain.isPermitted).toEqual(false);
	});

	test("should not call setContracts if chain is not supported", async () => {
		metamask.isConnected = () => true;
		metamask.requestChainId = async () => fakeChainIdHex;

		mockIsChainSupported.mockImplementation(() => false);

		const setContractsSpy = jest.spyOn(contracts, "setContracts");

		await store.dispatch(connectChain());
		expect(setContractsSpy).not.toBeCalled();
		expect(store.getState().chain.isConnected).toEqual(true);	
		expect(store.getState().chain.isPermitted).toEqual(false);
	});
	
	test("should set chain ok if chain is supported and connected", async () => {
		metamask.isConnected = () => true;
		metamask.requestChainId = async () => fakeChainIdHex;

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		await store.dispatch(connectChain());
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isConnected).toEqual(true);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});

	test("should call setContracts if chain is supported", async () => {
		metamask.isConnected = () => false;
		metamask.requestChainId = async () => fakeChainIdHex;

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		const setContractsSpy = jest.spyOn(contracts, "setContracts");

		await store.dispatch(connectChain());
		expect(setContractsSpy).toBeCalled();
		expect(store.getState().chain.id).toEqual(fakeChainIdInt);
		expect(store.getState().chain.name).toEqual(fakeChainName);
		expect(store.getState().chain.isConnected).toEqual(false);
		expect(store.getState().chain.isPermitted).toEqual(true);
	});
});

describe("switchChain", () => {
	test("should request metamask module", async () => {
		metamask.requestChainId = async () => fakeChainIdHex;

		const requestChainSwitchSpy = jest.spyOn(metamask, "requestChainSwitch");

		await store.dispatch(switchChain(fakeChainIdHex));
		expect(requestChainSwitchSpy).toBeCalledWith(fakeChainIdHex);
	});
});

describe("chainSwitched", () => {
	test("should call deleteContracts, set new values and call checkConnection", async () => {
		const checkConnectionSpy = jest.spyOn(connectionThunks, "checkConnection");

		metamask.isConnected = () => true;
		metamask.requestChainId = async () => fakeChainIdHex;

		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);

		const deleteContractsSpy = jest.spyOn(contracts, "deleteContracts");

		await store.dispatch(chainSwitched());
		expect(deleteContractsSpy).toBeCalled();
		expect(checkConnectionSpy).toBeCalled();

		let chain = store.getState().chain;
		expect(chain.isConnected).toEqual(true);
		expect(chain.isPermitted).toEqual(true);
		expect(chain.id).toEqual(parseInt(fakeChainIdHex, 16).toString());
		expect(chain.name).toEqual(fakeChainName);
	});
});

describe("setChainListeners", () => {
	test("should set listeners flag to true", async () => {
		metamask.setChainSwitchCallback = () => null;

		await store.dispatch(setChainListeners());
		expect(store.getState().chain.listenersSet).toEqual(true);
	});
});

test("should reset state if provider disconnected", async () => {
	metamask.isConnected = () => true;
	metamask.requestChainId = async () => fakeChainIdHex;

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
