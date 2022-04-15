import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { checkConnection } from './thunks';
import { providerDisconnected } from '../wallet/provider';

import { ConnectionSlice } from './connectionSlice.types';

export const initialState: ConnectionSlice = {
	killswitch: true,
}

const connectionSlice = createSlice({
	name: "blockchain/connection",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(checkConnection.fulfilled, (state, action: PayloadAction<boolean>) => {
			let statusOk = action.payload;
      state.killswitch = !statusOk;
    });
		builder.addCase(checkConnection.rejected, (state) => {
      state.killswitch = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.killswitch = true;
    });
  }
});

export const connectionReducer = connectionSlice.reducer;
