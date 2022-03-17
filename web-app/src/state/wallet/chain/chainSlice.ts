import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectChain, setChainListeners } from './thunks';

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
			state.isPermitted = false;
		});
		builder.addCase(setChainListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
  }
});

export default chainSlice.reducer;
