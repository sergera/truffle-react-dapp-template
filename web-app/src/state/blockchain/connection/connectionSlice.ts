import { 
	createSlice, 
	PayloadAction 
} from '@reduxjs/toolkit';

import { 
	checkConnection 
} from '.';
import { 
	providerDisconnected 
} from '../wallet/provider';

import { 
	ConnectionSlice 
} from './connectionSlice.types';

export const initialState: ConnectionSlice = {
	statusOk: false,
}

const connectionSlice = createSlice({
	name: "blockchain/connection",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(checkConnection.fulfilled, (state, action: PayloadAction<boolean>) => {
			let status = action.payload;
      state.statusOk = status;
    });
		builder.addCase(checkConnection.rejected, (state) => {
      state.statusOk = false;
    });
		builder.addCase(providerDisconnected.fulfilled, (state) => {
			state.statusOk = false;
    });
  }
});

export const connectionReducer = connectionSlice.reducer;
