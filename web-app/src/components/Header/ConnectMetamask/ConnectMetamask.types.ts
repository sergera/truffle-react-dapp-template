export interface ConnectMetamaskProps {
	connect: Function;
	selectChain: Function;
	killswitch: boolean;
	chainName: string;
	account: string;
	providerEnabled: boolean;
	providerListenersSet: boolean;
	chainConnected: boolean;
	chainPermitted: boolean;
	chainListenersSet: boolean;
	accountListenersSet: boolean;
};
