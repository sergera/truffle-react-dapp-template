export interface ConnectMetamaskProps {
	connect: Function;
	selectChain: Function;
	killswitch: boolean;
	chainName: string;
	account: string;
	providerIsEnabled: boolean;
	providerListenersAreSet: boolean;
	chainIsConnected: boolean;
	chainIsPermitted: boolean;
	chainListenersAreSet: boolean;
	accountListenersAreSet: boolean;
};
