import { 
	createSlice, 
	PayloadAction 
} from '@reduxjs/toolkit';

import { 
	ContractSlice 
} from './contractSlice.types';

export const initialState: ContractSlice = {
	acquired: false,
};

const contractSlice = createSlice({
	name: "blockchain/contract",
	initialState,
	reducers: {
		setContractAcquired(state, action:PayloadAction<boolean>) {
			state.acquired = action.payload;
		},
	},
});

export const { 
	setContractAcquired,
} = contractSlice.actions;

export const contractReducer = contractSlice.reducer;
