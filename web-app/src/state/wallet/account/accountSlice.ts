import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectAccount, setAccountListeners } from './thunks';
import { providerDisconnected } from '../provider/thunks';

import { AccountSlice } from './accountSlice.types';

export const initialState: AccountSlice = {
	address: "",
	listenersSet: false,
}

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(connectAccount.fulfilled, (state, action: PayloadAction<string>) => {
			let address = action.payload;
      state.address = address;
    });
		builder.addCase(connectAccount.rejected, (state) => {
      state.address = "";
    });
		builder.addCase(setAccountListeners.fulfilled, (state) => {
			state.listenersSet = true;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.address = "";
			state.listenersSet = false;
    });
  }
});

export default accountSlice.reducer;
