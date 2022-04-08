export interface ProviderSlice {
	metamaskInstalled: boolean;
	metamaskOnly: boolean;
	listenersSet: boolean;
};

export interface ConnectProviderPayload {
	metamaskInstalled: boolean;
	metamaskOnly: boolean;
};
