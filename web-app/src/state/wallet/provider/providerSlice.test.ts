import detectProvider from '@metamask/detect-provider';

import getNewStore from '../../../utils/test/getNewStore';
import * as contracts from '../../../blockchain/contracts';

import { initialState } from './providerSlice';
import { connectProvider, providerDisconnected, setProviderListeners } from './thunks';

declare var window: any;

let store = getNewStore();

jest.mock('@metamask/detect-provider', () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockDetectProvider = detectProvider as jest.Mock;

afterEach(() => {
	store = getNewStore();
	delete window.ethereum;
});

test("should set initial state", () => {
	const state = store.getState().provider;
	expect(state).toEqual(initialState);
});

describe("connectProvider", () => {
	test("should open modal if metamask is not installed", async () => {
		window.ethereum = {};

		mockDetectProvider.mockImplementation(() => null);
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("NOT_INSTALLED");
		expect(store.getState().provider.statusOk).toEqual(false);
	});
	
	test("should open modal if metamask is not the only provider", async () => {
		window.ethereum = {	isConnected: () => true	};
	
		// provider must be !== than window.ethereum in case there are more than one installed
		mockDetectProvider.mockImplementation(() => Object.assign({}, window.ethereum));
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("MULTIPLE_PROVIDERS");
		expect(store.getState().provider.statusOk).toEqual(false);
	});
	
	test("should open modal if metamask is not connected", async () => {
		window.ethereum = {	isConnected: () => false	};

		mockDetectProvider.mockImplementation(() => window.ethereum);
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("NOT_CONNECTED");
		expect(store.getState().provider.statusOk).toEqual(false);
	});
	
	test("should set statusOk if only metamask installed and is connected", async () => {
		window.ethereum = {	isConnected: () => true };

		mockDetectProvider.mockImplementation(() => window.ethereum);
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("");
		expect(store.getState().provider.statusOk).toEqual(true);
	});	
});

describe("providerDisconnected", () => {
	test("should call open modal", async () => { 
		await store.dispatch(providerDisconnected());
		expect(store.getState().modal.type).toEqual("DISCONNECTED");
		expect(store.getState().provider.statusOk).toEqual(false);
		expect(store.getState().provider.listenersSet).toEqual(false);
	});
});

describe("setProviderListeners", () => {
	test("should set listeners flag to true", async () => {
		window.ethereum = {	on: () => null };
		
		await store.dispatch(setProviderListeners());
		expect(store.getState().provider.listenersSet).toEqual(true);
	});
});
