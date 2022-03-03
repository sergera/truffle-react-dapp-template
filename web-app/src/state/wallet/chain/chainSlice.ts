import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectChain, setChainListeners } from './thunks';

import { ChainSlice, ConnectChainPayload } from './types';

const initialState: ChainSlice = {
	name: "",
	isPermitted: false,
	listenersSet: false,
};

const chainSlice = createSlice({
	name: "chain",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(connectChain.fulfilled, (state, action: PayloadAction<ConnectChainPayload>) => {
			let { name, supported } = action.payload;
			state.name = name;
			state.isPermitted = supported;
		});
		builder.addCase(connectChain.rejected, (state) => {
			state.name = "";
			state.isPermitted = false;
		});
		builder.addCase(setChainListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
  }
});

export default chainSlice.reducer;
