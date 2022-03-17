import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectAccount, setAccountListeners } from './thunks';

import { AccountSlice } from './types';

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
  }
});

export default accountSlice.reducer;
