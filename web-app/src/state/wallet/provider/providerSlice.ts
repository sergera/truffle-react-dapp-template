import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectProvider, setProviderListeners, providerDisconnected } from './thunks';

import { ProviderSlice } from './ProviderSlice.types';

export const initialState: ProviderSlice = {
	statusOk: false,
	listenersSet: false,
};

const providerSlice = createSlice({
	name: "provider",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(connectProvider.fulfilled, (state, action:PayloadAction<boolean>) => {
			let statusOk = action.payload;
			state.statusOk = statusOk;
    });
		builder.addCase(connectProvider.rejected, (state) => {
			state.statusOk = false;
    });
		builder.addCase(setProviderListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.statusOk = false;
			state.listenersSet = false;
    });
  }
});

export default providerSlice.reducer;
