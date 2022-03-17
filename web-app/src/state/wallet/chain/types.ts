export interface ChainSlice {
	name: string,
	id: string,
	isPermitted: boolean,
	listenersSet: boolean,
};

export interface ConnectChainPayload {
	name: string,
	id: string,
	supported: boolean,
};
