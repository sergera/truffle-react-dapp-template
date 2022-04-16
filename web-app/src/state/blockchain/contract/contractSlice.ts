import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContractSlice } from './contractSlice.types';

export const initialState: ContractSlice = {
	isAcquired: false,
};

const contractSlice = createSlice({
	name: "blockchain/contract",
	initialState,
	reducers: {
		setContractAcquired(state, action:PayloadAction<boolean>) {
			state.isAcquired = action.payload;
		},
	},
});

export const { 
	setContractAcquired,
} = contractSlice.actions;

export const contractReducer = contractSlice.reducer;
