export interface ConnectMetamaskProps {
	connect: Function;
	providerOk: boolean;
	chain: {
		name: string;
		isConnected: boolean;
		isPermitted: boolean;
	},
	account: string;
};
