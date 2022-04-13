import { 
	metamask
} from '.';

import {
	ProviderRpcError
} from './metamask.types';

declare var window: any;

const fakeChainIdHex = "0x0";
const fakeChainName = "fake chain name";

/* silence logger */
jest.mock("../../logger", () => ({
	__esModule: true,
	log: jest.fn(),
}));

/* mock metamask injected provider */
const fakeProvider = {
	on: () => null,
	request: async () => null,
	isConnected: () => null,
	isMetaMask: true,
}

describe("isConnected", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should call ethereum provider", () => {
		const isConnectedSpy = jest.spyOn(window.ethereum, "isConnected");

		metamask.isConnected();
		expect(isConnectedSpy).toBeCalled();
	});
});

describe("acquireProvider", () => {
	beforeEach(() => {
		delete window.ethereum;
	});

	test("should return success status if enabled", () => {
		window.ethereum = fakeProvider;

		const result = metamask.acquireProvider();
		expect(result).toEqual(fakeProvider);
	});

	test("should return not installed if no detection", () => {
		window.ethereum = undefined;

		const result = metamask.acquireProvider();
		expect(result).toEqual(null);
	});

	test("should return specific provider if multiple providers", () => {
		const fakeMetamaskInProvidersArray = {isMetaMask: true, fakeProviderId: "thisismetamask"};

		window.ethereum = { ...fakeProvider, providers: [fakeMetamaskInProvidersArray, fakeProvider]};

		const result = metamask.acquireProvider();
		expect(result).toEqual(fakeMetamaskInProvidersArray);
	});
});

describe("requestChainId", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should request ethereum provider", async () => {
		const requestSpy = jest.spyOn(window.ethereum, "request");

		await metamask.requestChainId();
		expect(requestSpy).toBeCalledWith({
			method: 'eth_chainId',
		});
	});
});

describe("requestAccounts", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should request ethereum provider", async () => {
		const requestSpy = jest.spyOn(window.ethereum, "request");

		await metamask.requestAccounts();
		expect(requestSpy).toBeCalledWith({
			method: 'eth_requestAccounts',
		});
	});
});

describe("requestChainSwitch", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should request ethereum provider", async () => {
		const requestSpy = jest.spyOn(window.ethereum, "request");

		await metamask.requestChainSwitch(fakeChainIdHex);
		expect(requestSpy).toBeCalledWith({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: fakeChainIdHex }],
		});
	});

	test("should return success status in case successful", async () => {
		const status = await metamask.requestChainSwitch(fakeChainIdHex);
		expect(status).toEqual({
			successful: true,
			chainInWallet: true,
		})
	});

	test("should return failure status in case failure", async () => {
		window.ethereum = { ...fakeProvider, request: () => { throw new Error("") } };

		metamask.acquireProvider();

		const status = await metamask.requestChainSwitch(fakeChainIdHex);
		expect(status).toEqual({
			successful: false,
			chainInWallet: false,
		})
	});

	test("should return failure status in case chain not added", async () => {
		class ChainNotAddedTestError implements ProviderRpcError {
			public name: string;
			public message: string;
			public code: number;
			constructor() {
				this.name = "";
				this.message = ""
				this.code = 4902;
			}
		};

		window.ethereum = { ...fakeProvider, request: () => { throw new ChainNotAddedTestError() } };

		metamask.acquireProvider();

		const status = await metamask.requestChainSwitch(fakeChainIdHex);
		expect(status).toEqual({
			successful: false,
			chainInWallet: false,
		})
	});
});

describe("requestChainAdd", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});
	
	const fakeRpcUrls = ['https://fake1','https://fake2'];
	
	test("should request ethereum provider", async () => {
		const requestSpy = jest.spyOn(window.ethereum, "request");

		await metamask.requestChainAdd(fakeChainIdHex, fakeChainName, fakeRpcUrls);
		expect(requestSpy).toBeCalledWith({
			method: 'wallet_addEthereumChain',
			params: [{ 
				chainId: fakeChainIdHex, 
				chainName: fakeChainName,
				rpcUrls: fakeRpcUrls,
			}],
		});
	});

	test("should return success status in case successful", async () => {
		const status = await metamask.requestChainAdd(fakeChainIdHex, fakeChainName, fakeRpcUrls);
		expect(status).toEqual({
			successful: true,
		});
	});

	test("should return failure status in case failure", async () => {
		window.ethereum = { ...fakeProvider, request: () => { throw new Error("") } };

		metamask.acquireProvider();

		const status = await metamask.requestChainAdd(fakeChainIdHex, fakeChainName, fakeRpcUrls);
		expect(status).toEqual({
			successful: false,
		});
	});
});

describe("setConnectCallback", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should call provider listener setter", async () => {
		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await metamask.setConnectCallback(callback);
		expect(onSpy).toBeCalledWith(
			'connect', expect.any(Function)
		);
	});
});

describe("setDisconnectCallback", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should call provider listener setter", async () => {
		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await metamask.setDisconnectCallback(callback);
		expect(onSpy).toBeCalledWith(
			'disconnect', expect.any(Function)
		);
	});
});

describe("setChainSwitchCallback", () => {
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should call provider listener setter", async () => {
		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await metamask.setChainSwitchCallback(callback);
		expect(onSpy).toBeCalledWith(
			'chainChanged', expect.any(Function)
		);
	});
});

describe("setAccountSwitchCallback", () => {	
	beforeAll(() => {
		window.ethereum = fakeProvider;
		metamask.acquireProvider();
	});

	test("should call provider listener setter", async () => {
		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await metamask.setAccountSwitchCallback(callback);
		expect(onSpy).toBeCalledWith(
			'accountsChanged', expect.any(Function)
		);
	});
});
