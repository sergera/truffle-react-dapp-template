import { 
	createSlice, 
	PayloadAction 
} from '@reduxjs/toolkit';

import { 
	connectChain, 
	setChainListeners 
} from '.';
import { 
	providerDisconnected 
} from '../provider';

import { 
	ChainSlice, 
	ConnectChainPayload 
} from './chainSlice.types';

export const initialState: ChainSlice = {
	name: "",
	id: "",
	isConnected: false,
	isPermitted: false,
	listenersSet: false,
};

const chainSlice = createSlice({
	name: "blockchain/wallet/chain",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(connectChain.fulfilled, (state, action: PayloadAction<ConnectChainPayload>) => {
			let { name, id, connected, supported } = action.payload;
			state.name = name;
			state.id = id;
			state.isConnected = connected;
			state.isPermitted = supported;
		});
		builder.addCase(connectChain.rejected, (state) => {
			state.name = "";
			state.id = "";
			state.isConnected = false;
			state.isPermitted = false;
		});
		builder.addCase(setChainListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.name = "";
			state.id = "";
			state.isConnected = false;
			state.isPermitted = false;
			state.listenersSet = false;
    });
  }
});

export const chainReducer = chainSlice.reducer;
