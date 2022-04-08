export interface ConnectMetamaskProps {
	connect: Function;
	selectChain: Function;
	connectionStatusOk: boolean;
	chainName: string;
	account: string;
	metamaskInstalled: boolean;
	metamaskSoleProvider: boolean;
	providerListenersSet: boolean;
	chainConnected: boolean;
	chainPermitted: boolean;
	chainListenersSet: boolean;
	accountListenersSet: boolean;
};
