import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../..';

export const checkConnection = createAsyncThunk<
	boolean, // return type
	void, // first argument type
	{ state: RootState }
>(
	"blockchain/connection/check",
	async(_,thunkAPI) => {
		let { getState } = thunkAPI;

		const state = getState();

		const providerOk = ( 
			state.provider.isEnabled &&
			state.provider.listenersAreSet
		);

		const chainOk = (
			state.chain.isConnected && 
			state.chain.isPermitted && 
			state.chain.name !== undefined &&
			state.chain.name !== null &&
			typeof state.chain.name === typeof "" &&
			state.chain.name.length > 0 &&
			state.chain.listenersAreSet
		);

		const accountOk = (
			state.account.address !== undefined && 
			state.account.address !== null && 
			typeof state.account.address === typeof "" &&
			state.account.address.length > 0 &&
			state.account.listenersAreSet
		);

		const contractOk = (
			state.contract.isAcquired
		);

		return providerOk && chainOk && accountOk && contractOk;
	}
);
