import { createAsyncThunk } from '@reduxjs/toolkit';

import { connectProvider, setProviderListeners } from './provider';
import { connectChain, setChainListeners } from './chain';
import { connectAccount, setAccountListeners } from './account';

import { RootState } from '..';

export const connectWallet = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
	'wallet/connect',
	async(_,thunkAPI) => {
		let { getState, dispatch } = thunkAPI;

		await dispatch(connectProvider());
		await dispatch(connectChain());
		await dispatch(connectAccount());

		getState().provider.listenersSet || dispatch(setProviderListeners());
		getState().chain.listenersSet || dispatch(setChainListeners());
		getState().account.listenersSet || dispatch(setAccountListeners());
	}
);
