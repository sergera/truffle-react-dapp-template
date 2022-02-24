import { createSlice } from '@reduxjs/toolkit';

import { isNetSupported, getNetName } from '../../../utils/ethereumNetworks';

interface Slice {
	connected: string,
	isPermitted: boolean
};

const initialState:Slice = {
	connected: "",
	isPermitted: false
};

interface Action {
	type: string,
	payload: number
};

const networkSlice = createSlice({
	name: "network",
	initialState,
	reducers: {
		networkChanged(state, action:Action) {
			state.connected = getNetName(action.payload);
			state.isPermitted = isNetSupported(action.payload);
		}
	}
});

export const { networkChanged } = networkSlice.actions;

export default networkSlice.reducer;
