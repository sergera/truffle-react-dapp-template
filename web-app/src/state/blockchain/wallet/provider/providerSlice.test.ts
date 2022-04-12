import { 
	initialState, 
	connectProvider, 
	providerDisconnected, 
	setProviderListeners 
} from '.';

import * as metamask from '../../../../blockchain/metamask';
import * as contracts from '../../../../blockchain/contracts';
import { 
	getNewStore 
} from '../../../../test';

/* mock non-redux modules that will be spied on for import consistency */
jest.mock("../../../../blockchain/contracts", () => ({
	__esModule: true,
	deleteContracts: jest.fn(),
}));

/* mock functions to be mocked */
/* mock functions that use window.ethereum so that error isn't thrown on access */
/* mock all used functions in mocked modules so that error isn't thrown on access */
jest.mock("../../../../blockchain/metamask", () => ({
	__esModule: true,
	detectMetamaskProvider: jest.fn(),
	setConnectCallback: jest.fn(),
	setDisconnectCallback: jest.fn(),
}));

const mockDetectMetamaskProvider = metamask.detectMetamaskProvider as jest.Mock;

/* test */

let store = getNewStore();

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().provider;
	expect(state).toEqual(initialState);
});

describe("connectProvider", () => {
	test("should open modal if metamask is not enabled", async () => {
		mockDetectMetamaskProvider.mockImplementation(() => ({
			isEnabled: false,
			isSoleProvider: false,
		}));
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("DISABLED");
		expect(store.getState().provider.metamaskInstalled).toEqual(false);
		expect(store.getState().provider.metamaskOnly).toEqual(false);
	});
	
	test("should open modal if metamask is not the only provider", async () => {
		mockDetectMetamaskProvider.mockImplementation(() => ({
			isEnabled: true,
			isSoleProvider: false,
		}));
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("MULTIPLE_PROVIDERS");
		expect(store.getState().provider.metamaskInstalled).toEqual(true);
		expect(store.getState().provider.metamaskOnly).toEqual(false);
	});

	test("should set statusOk if only metamask installed and is sole provider", async () => {
		mockDetectMetamaskProvider.mockImplementation(() => ({
			isEnabled: true,
			isSoleProvider: true,
		}));
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("");
		expect(store.getState().provider.metamaskInstalled).toEqual(true);
		expect(store.getState().provider.metamaskOnly).toEqual(true);
	});	
});

describe("providerDisconnected", () => {
	test("should open modal, set state to initial, and call delete contracts", async () => { 
		const deleteContractsSpy = jest.spyOn(contracts, "deleteContracts");

		await store.dispatch(providerDisconnected());
		expect(deleteContractsSpy).toBeCalled();
		expect(store.getState().modal.type).toEqual("DISCONNECTED");
		expect(store.getState().provider.metamaskInstalled).toEqual(false);
		expect(store.getState().provider.metamaskOnly).toEqual(false);
		expect(store.getState().provider.listenersSet).toEqual(false);
	});
});

describe("setProviderListeners", () => {
	test("should set listeners flag to true", async () => {
		await store.dispatch(setProviderListeners());
		expect(store.getState().provider.listenersSet).toEqual(true);
	});
});
