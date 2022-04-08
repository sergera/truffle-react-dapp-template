import { 
	createSlice, 
	PayloadAction,
} from '@reduxjs/toolkit';

import { 
	connectProvider, 
	setProviderListeners, 
	providerDisconnected,
} from './thunks';

import { 
	ProviderSlice,
	ConnectProviderPayload,
} from './providerSlice.types';

export const initialState: ProviderSlice = {
	metamaskInstalled: false,
	metamaskOnly: false,
	listenersSet: false,
};

const providerSlice = createSlice({
	name: "blockchain/wallet/provider",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(connectProvider.fulfilled, (state, action:PayloadAction<ConnectProviderPayload>) => {
			const { metamaskInstalled, metamaskOnly } = action.payload;
			state.metamaskInstalled = metamaskInstalled;
			state.metamaskOnly = metamaskOnly;
    });
		builder.addCase(connectProvider.rejected, (state) => {
			state.metamaskInstalled = false;
			state.metamaskOnly = false;
    });
		builder.addCase(setProviderListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.metamaskInstalled = false;
			state.metamaskOnly = false;
			state.listenersSet = false;
    });
  }
});

export const providerReducer = providerSlice.reducer;
