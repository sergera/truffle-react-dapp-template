export interface ChainSlice {
	name: string;
	id: string;
	isConnected: boolean;
	isPermitted: boolean;
	listenersSet: boolean;
};

export interface ConnectChainPayload {
	name: string;
	id: string;
	connected: boolean;
	supported: boolean;
};
