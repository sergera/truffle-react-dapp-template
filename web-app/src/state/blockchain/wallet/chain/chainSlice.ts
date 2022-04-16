import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectChain, setChainListeners } from './thunks';
import { providerDisconnected } from '../provider';

import { ChainSlice, ConnectChainPayload } from './chainSlice.types';

export const initialState: ChainSlice = {
	name: "",
	id: "",
	isConnected: false,
	isPermitted: false,
	listenersAreSet: false,
};

const chainSlice = createSlice({
	name: "blockchain/wallet/chain",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(connectChain.fulfilled, (state, action: PayloadAction<ConnectChainPayload>) => {
			let { name, id, isConnected, isSupported } = action.payload;
			state.name = name;
			state.id = id;
			state.isConnected = isConnected;
			state.isPermitted = isSupported;
		});
		builder.addCase(connectChain.rejected, (state) => {
			state.name = "";
			state.id = "";
			state.isConnected = false;
			state.isPermitted = false;
		});
		builder.addCase(setChainListeners.fulfilled, (state) => {
			state.listenersAreSet = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.name = "";
			state.id = "";
			state.isConnected = false;
			state.isPermitted = false;
			state.listenersAreSet = false;
    });
  }
});

export const chainReducer = chainSlice.reducer;
