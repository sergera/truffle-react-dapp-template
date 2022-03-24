import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectChain, setChainListeners } from './thunks';
import { providerDisconnected } from '../provider/thunks';

import { ChainSlice, ConnectChainPayload } from './types';

export const initialState: ChainSlice = {
	name: "",
	id: "",
	isPermitted: false,
	listenersSet: false,
};

const chainSlice = createSlice({
	name: "chain",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(connectChain.fulfilled, (state, action: PayloadAction<ConnectChainPayload>) => {
			let { name, id, supported } = action.payload;
			state.name = name;
			state.id = id;
			state.isPermitted = supported;
		});
		builder.addCase(connectChain.rejected, (state) => {
			state.name = "";
			state.id = "";
			state.isPermitted = false;
		});
		builder.addCase(setChainListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.name = "";
			state.id = "";
			state.isPermitted = false;
			state.listenersSet = false;
    });
  }
});

export default chainSlice.reducer;
