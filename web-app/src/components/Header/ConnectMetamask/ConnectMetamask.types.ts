export interface ConnectMetamaskProps {
	connect: Function;
	providerOk: boolean;
	chain: {
		name: string;
		isPermitted: boolean;
	},
	account: string;
};
