import { 
	isConnected,
	detectMetamaskProvider,
	requestAccounts,
	requestChainId,
	requestChainSwitch, 
	requestChainAdd,
	setConnectCallback,
	setDisconnectCallback,
	setChainSwitchCallback,
	setAccountSwitchCallback,
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

describe("isConnected", () => {
	afterEach(() => {
		delete window.ethereum;
	});

	test("should call ethereum provider", () => {
		window.ethereum = { isConnected: () => null	};

		const isConnectedSpy = jest.spyOn(window.ethereum, "isConnected");

		isConnected();
		expect(isConnectedSpy).toBeCalled();
	});
});

describe("detectMetamaskProvider", () => {
	afterEach(() => {
		delete window.ethereum;
	});

	test("should return success status if installed and equal to window.ethereum", async () => {
		const fakeProviderObject = { fakeProvider: true, isMetaMask: true };
		window.ethereum = fakeProviderObject;

		const result = await detectMetamaskProvider();
		expect(result).toEqual({
			isEnabled: true, 
			isSoleProvider: true
		});
	});

	test("should return not installed if no detection", async () => {
		window.ethereum = undefined;

		const result = await detectMetamaskProvider();
		expect(result).toEqual({
			isEnabled: false, 
			isSoleProvider: false
		});
	});

	test("should return not sole provider if not equal to window.ethereum", async () => {
		window.ethereum = { anotherFakeProvider: true, providers: [{fakeProvider: true, isMetaMask: true}] };

		const result = await detectMetamaskProvider();
		expect(result).toEqual({
			isEnabled: true, 
			isSoleProvider: false
		});
	});
});

describe("requestChainId", () => {
	afterEach(() => {
		delete window.ethereum;
	});

	test("should request ethereum provider", async () => {
		window.ethereum = { request: () => null	};

		const requestSpy = jest.spyOn(window.ethereum, "request");

		await requestChainId();
		expect(requestSpy).toBeCalledWith({
			method: 'eth_chainId',
		});
	});
});

describe("requestAccounts", () => {
	afterEach(() => {
		delete window.ethereum;
	});

	test("should request ethereum provider", async () => {
		window.ethereum = { request: () => null	};

		const requestSpy = jest.spyOn(window.ethereum, "request");

		await requestAccounts();
		expect(requestSpy).toBeCalledWith({
			method: 'eth_requestAccounts',
		});
	});
});

describe("requestChainSwitch", () => {
	afterEach(() => {
		delete window.ethereum;
	});

	test("should request ethereum provider", async () => {
		window.ethereum = { request: () => null	};

		const requestSpy = jest.spyOn(window.ethereum, "request");

		await requestChainSwitch(fakeChainIdHex);
		expect(requestSpy).toBeCalledWith({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: fakeChainIdHex }],
		});
	});

	test("should return success status in case successful", async () => {
		window.ethereum = { request: () => null	};

		const status = await requestChainSwitch(fakeChainIdHex);
		expect(status).toEqual({
			successful: true,
			chainInWallet: true,
		})
	});

	test("should return failure status in case failure", async () => {
		window.ethereum = { request: () => { throw new Error("") } };

		const status = await requestChainSwitch(fakeChainIdHex);
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

		window.ethereum = { request: () => { throw new ChainNotAddedTestError() } };

		const status = await requestChainSwitch(fakeChainIdHex);
		expect(status).toEqual({
			successful: false,
			chainInWallet: false,
		})
	});
});

describe("requestChainAdd", () => {
	const fakeRpcUrls = ['https://fake1','https://fake2'];

	afterEach(() => {
		delete window.ethereum;
	});
	
	test("should request ethereum provider", async () => {
		window.ethereum = { request: () => null	};

		const requestSpy = jest.spyOn(window.ethereum, "request");

		await requestChainAdd(fakeChainIdHex, fakeChainName, fakeRpcUrls);
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
		window.ethereum = { request: () => null	};

		const status = await requestChainAdd(fakeChainIdHex, fakeChainName, fakeRpcUrls);
		expect(status).toEqual({
			successful: true,
		});
	});

	test("should return failure status in case failure", async () => {
		window.ethereum = { request: () => { throw new Error("") } };

		const status = await requestChainAdd(fakeChainIdHex, fakeChainName, fakeRpcUrls);
		expect(status).toEqual({
			successful: false,
		});
	});
});

describe("setConnectCallback", () => {
	afterEach(() => {
		delete window.ethereum;
	});
	
	test("should call provider listener setter", async () => {
		window.ethereum = { on: () => null	};

		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await setConnectCallback(callback);
		expect(onSpy).toBeCalledWith(
			'connect', expect.any(Function)
		);
	});
});

describe("setDisconnectCallback", () => {
	afterEach(() => {
		delete window.ethereum;
	});
	
	test("should call provider listener setter", async () => {
		window.ethereum = { on: () => null	};

		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await setDisconnectCallback(callback);
		expect(onSpy).toBeCalledWith(
			'disconnect', expect.any(Function)
		);
	});
});

describe("setChainSwitchCallback", () => {
	afterEach(() => {
		delete window.ethereum;
	});
	
	test("should call provider listener setter", async () => {
		window.ethereum = { on: () => null	};

		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await setChainSwitchCallback(callback);
		expect(onSpy).toBeCalledWith(
			'chainChanged', expect.any(Function)
		);
	});
});

describe("setAccountSwitchCallback", () => {
	afterEach(() => {
		delete window.ethereum;
	});
	
	test("should call provider listener setter", async () => {
		window.ethereum = { on: () => null	};

		const onSpy = jest.spyOn(window.ethereum, "on");
		const callback = () => {};
		await setAccountSwitchCallback(callback);
		expect(onSpy).toBeCalledWith(
			'accountsChanged', expect.any(Function)
		);
	});
});
