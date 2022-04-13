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
} from './providerSlice.types';

export const initialState: ProviderSlice = {
	isEnabled: false,
	listenersSet: false,
};

const providerSlice = createSlice({
	name: "blockchain/wallet/provider",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(connectProvider.fulfilled, (state, action:PayloadAction<boolean>) => {
			const isEnabled = action.payload;
			state.isEnabled = isEnabled;
    });
		builder.addCase(connectProvider.rejected, (state) => {
			state.isEnabled = false;
    });
		builder.addCase(setProviderListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.isEnabled = false;
			state.listenersSet = false;
    });
  }
});

export const providerReducer = providerSlice.reducer;
