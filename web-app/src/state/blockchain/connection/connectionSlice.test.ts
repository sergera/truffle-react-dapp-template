import { 
	checkConnection,
	initialState,
} from '.';
import {
	connectWallet
} from '../wallet';
import {
	providerDisconnected
} from '../wallet/provider';

import { 
	getNewStore 
} from '../../../test';
import {
	detectMetamaskProvider,
	setConnectCallback,
	setDisconnectCallback,
	isConnected,
	requestChainId,
	setChainSwitchCallback,
	requestAccounts,
	setAccountSwitchCallback,
} from '../../../blockchain/metamask';
import { 
	isChainSupported, 
	getChainName 
} from '../../../blockchain/chains';
import {
	setContracts
} from '../../../blockchain/contracts';

/* mock functions to be mocked */
/* mock functions that use window.ethereum so that error isn't thrown on access */
/* mock all used functions in mocked modules so that error isn't thrown on access */
jest.mock("../../../blockchain/metamask", () => ({
	__esModule: true,
	detectMetamaskProvider: jest.fn(),
	setConnectCallback: jest.fn(),
	setDisconnectCallback: jest.fn(),
	isConnected: jest.fn(),
	requestChainId: jest.fn(),
	requestChainSwitch: jest.fn(),
	setChainSwitchCallback: jest.fn(),
	requestAccounts: jest.fn(),
	setAccountSwitchCallback: jest.fn(),
}));

const mockDetectProvider = detectMetamaskProvider as jest.Mock;
const mockIsConnected = isConnected as jest.Mock;
const mockRequestChainId = requestChainId as jest.Mock;
const mockRequestAccounts = requestAccounts as jest.Mock;

const mockSetConnectCallback = setConnectCallback as jest.Mock;
const mockSetDisconnectCallback = setDisconnectCallback as jest.Mock;
const mockSetChainSwitchCallback = setChainSwitchCallback as jest.Mock;
const mockSetAccountSwitchCallback = setAccountSwitchCallback as jest.Mock;

jest.mock("../../../blockchain/chains", () => ({
	__esModule: true,
	isChainSupported: jest.fn(),
	getChainName: jest.fn(),
}));

const mockIsChainSupported = isChainSupported as jest.Mock;
const mockGetChainName = getChainName as jest.Mock;

jest.mock("../../../blockchain/contracts", () => ({
	__esModule: true,
	setContracts: jest.fn(),
	deleteContracts: jest.fn(),
}));

const mockSetContracts = setContracts as jest.Mock;

/* declare mock return variables */

const fakeProviderDetection = {
	isInstalled: true,
	isSoleProvider: true,
};
const fakeChainIdHex = "0x0";
const fakeChainName = "fake chain name";
const fakeAddress = "fake address";
const fakeAccounts = [fakeAddress];

/* test */

let store = getNewStore();

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().connection;
	expect(state).toEqual(initialState);
});

describe("checkConnection", () => {
	test("should set statusOk true if all blockchain related state is ok", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(true);
	});

	test("should set statusOk false if metamask not installed", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => ({
			isInstalled: false,
			isSoleProvider: true,
		}));
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if metamask not sole provider", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => ({
			isInstalled: true,
			isSoleProvider: false,
		}));
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if provider listeners not set", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		mockSetConnectCallback.mockImplementation(() => {throw new Error("")});
		mockSetDisconnectCallback.mockImplementation(() => {throw new Error("")});

		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if chain not connected", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => false);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if chain not permitted", async () => {
		mockIsChainSupported.mockImplementation(() => false);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if chain listeners not set", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		mockSetChainSwitchCallback.mockImplementation(() => {throw new Error("")});

		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if account not retrieved", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => [""]);
	
		mockSetContracts.mockImplementation(() => true);

		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if account listeners not set", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => true);
	
		mockSetAccountSwitchCallback.mockImplementation(() => {throw new Error("")});

		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});

	test("should set statusOk false if contracts not acquired", async () => {
		mockIsChainSupported.mockImplementation(() => true);
		mockGetChainName.mockImplementation(() => fakeChainName);
	
		mockDetectProvider.mockImplementation(() => fakeProviderDetection);
		mockIsConnected.mockImplementation(() => true);
		mockRequestChainId.mockImplementation(() => fakeChainIdHex);
		mockRequestAccounts.mockImplementation(() => fakeAccounts);
	
		mockSetContracts.mockImplementation(() => false);
	
		await store.dispatch(connectWallet());
		await store.dispatch(checkConnection());
		expect(store.getState().connection.statusOk).toEqual(false);
	});
});

test("should reset state if provider disconnected", async () => {
	mockIsChainSupported.mockImplementation(() => true);
	mockGetChainName.mockImplementation(() => fakeChainName);

	mockDetectProvider.mockImplementation(() => fakeProviderDetection);
	mockIsConnected.mockImplementation(() => true);
	mockRequestChainId.mockImplementation(() => fakeChainIdHex);
	mockRequestAccounts.mockImplementation(() => fakeAccounts);

	mockSetContracts.mockImplementation(() => true);

	await store.dispatch(connectWallet());
	await store.dispatch(checkConnection);
	expect(store.getState().connection.statusOk).toEqual(true);

	await store.dispatch(providerDisconnected());
	expect(store.getState().connection).toEqual(initialState);
});
