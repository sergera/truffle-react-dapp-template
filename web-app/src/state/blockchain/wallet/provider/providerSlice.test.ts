import { 
	initialState, 
	connectProvider, 
	providerDisconnected, 
	setProviderListeners 
} from '.';

import { metamask } from '../../../../blockchain/metamask';
import * as contracts from '../../../../blockchain/contracts';
import { 
	getNewStore 
} from '../../../../test';

/* mock non-redux modules that will be spied on for import consistency */
jest.mock("../../../../blockchain/contracts", () => ({
	__esModule: true,
	deleteContracts: jest.fn(),
}));

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
		metamask.acquireProvider = ()	=> null;
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("DISABLED");
		expect(store.getState().provider.isEnabled).toEqual(false);
	});

	test("should set statusOk if only metamask enabled", async () => {
		metamask.acquireProvider = ()	=> ({fakeProvider: true});
	
		await store.dispatch(connectProvider());
		expect(store.getState().modal.type).toEqual("");
		expect(store.getState().provider.isEnabled).toEqual(true);
	});	
});

describe("providerDisconnected", () => {
	test("should open modal, set state to initial, and call delete contracts", async () => { 
		const deleteContractsSpy = jest.spyOn(contracts, "deleteContracts");

		await store.dispatch(providerDisconnected());
		expect(deleteContractsSpy).toBeCalled();
		expect(store.getState().modal.type).toEqual("DISCONNECTED");
		expect(store.getState().provider.isEnabled).toEqual(false);
		expect(store.getState().provider.listenersSet).toEqual(false);
	});
});

describe("setProviderListeners", () => {
	test("should set listeners flag to true", async () => {
		metamask.setConnectCallback = () => null;
		metamask.setDisconnectCallback = () => null;

		await store.dispatch(setProviderListeners());
		expect(store.getState().provider.listenersSet).toEqual(true);
	});
});
