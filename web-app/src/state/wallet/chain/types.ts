export interface ChainSlice {
	name: string,
	isPermitted: boolean,
	listenersSet: boolean,
};

export interface ConnectChainPayload {
	name: string,
	supported: boolean,
};
