export interface ChainSlice {
	name: string;
	id: string;
	isConnected: boolean;
	isPermitted: boolean;
	listenersAreSet: boolean;
};

export interface ConnectChainPayload {
	name: string;
	id: string;
	isConnected: boolean;
	isSupported: boolean;
};
