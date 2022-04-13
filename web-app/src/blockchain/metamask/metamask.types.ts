// interface for MetaMask errors
export interface ProviderRpcError extends Error {
	message: string;
	code: number;
	data?: unknown;
};

export interface IInjectedProviderApi {
	provider: any;
	acquireProvider(): any;
	isConnected(): boolean;
	requestChainId(): Promise<string>;
	requestAccounts(): Promise<string[]>;
	requestChainSwitch(chainIdHex: string): Promise<{chainInWallet: boolean, successful: boolean}>;
	requestChainAdd(chainIdHex: string, chainName: string, rpcUrls: string[]): Promise<{successful: boolean}>;
	setConnectCallback(callback: Function): void;
	setDisconnectCallback(callback: Function): void;
	setAccountSwitchCallback(callback: Function): void;
	setChainSwitchCallback(callback: Function): void;
}
