import * as metamask from '../../../blockchain/metamask';
import * as contracts from '../../../blockchain/contracts/contracts';
import { 
	getNewStore 
} from '../../../test';

import { 
	initialState, 
	connectProvider, 
	providerDisconnected, 
	setProviderListeners 
} from '.';

jest.mock("../../../blockchain/metamask", () => ({
	__esModule: true,
	detectMetamaskProvider: jest.fn(),
	setConnectCallback: jest.fn(),
	setDisconnectCallback: jest.fn(),
}));

const mockDetectMetamaskProvider = metamask.detectMetamaskProvider as jest.Mock;

let store = getNewStore();

afterEach(() => {
	store = getNewStore();
});

test("should set initial state", () => {
	const state = store.getState().provider;
	expect(state).toEqual(initialState);
});

describe("connectProvider", () => {
	test("should open modal if metamask is not installed", async () => {
		mockDetectMetamaskProvider.mockImplementation(() => ({
			isInstalled: false,
			isSoleProvider: false,
		}));
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("NOT_INSTALLED");
		expect(store.getState().provider.statusOk).toEqual(false);
	});
	
	test("should open modal if metamask is not the only provider", async () => {
		mockDetectMetamaskProvider.mockImplementation(() => ({
			isInstalled: true,
			isSoleProvider: false,
		}));
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("MULTIPLE_PROVIDERS");
		expect(store.getState().provider.statusOk).toEqual(false);
	});

	test("should set statusOk if only metamask installed and is sole provider", async () => {
		mockDetectMetamaskProvider.mockImplementation(() => ({
			isInstalled: true,
			isSoleProvider: true,
		}));
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("");
		expect(store.getState().provider.statusOk).toEqual(true);
	});	
});

describe("providerDisconnected", () => {
	test("should open modal, set state to initial, and call delete contracts", async () => { 
		const deleteContractsSpy = jest.spyOn(contracts, "deleteContracts");

		await store.dispatch(providerDisconnected());
		expect(deleteContractsSpy).toBeCalled();
		expect(store.getState().modal.type).toEqual("DISCONNECTED");
		expect(store.getState().provider.statusOk).toEqual(false);
		expect(store.getState().provider.listenersSet).toEqual(false);
	});
});

describe("setProviderListeners", () => {
	test("should set listeners flag to true", async () => {
		await store.dispatch(setProviderListeners());
		expect(store.getState().provider.listenersSet).toEqual(true);
	});
});
