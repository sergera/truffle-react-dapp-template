import { 
	createAsyncThunk 
} from '@reduxjs/toolkit';

import { 
	connectProvider, 
	setProviderListeners 
} from './provider';
import { 
	connectChain, 
	setChainListeners 
} from './chain';
import { 
	connectAccount, 
	setAccountListeners 
} from './account';
import {
	checkConnection
} from '../connection';

import { 
	RootState 
} from '../..';

export const connectWallet = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
	"blockchain/wallet/connect",
	async(_,thunkAPI) => {
		let { getState, dispatch } = thunkAPI;

		await dispatch(connectProvider());
		const providerOk = getState().provider.isEnabled;

		providerOk && await dispatch(connectChain());
		providerOk && await dispatch(connectAccount());

		getState().provider.listenersSet || await dispatch(setProviderListeners());
		getState().chain.listenersSet || await dispatch(setChainListeners());
		getState().account.listenersSet || await dispatch(setAccountListeners());

		await dispatch(checkConnection());
	}
);
