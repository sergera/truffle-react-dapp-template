import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../..';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

export const connectAccount = createAsyncThunk<
	string, // return type
	void, // first argument type
	{ state: RootState }
>(
  'wallet/account/connect',
  async (_,thunkAPI) => {
		let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
		return accounts[0];
  }
);

export const setAccountListeners = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
'wallet/account/setListeners',
	async (_,thunkAPI) => {
		let { dispatch } = thunkAPI;
		window.ethereum.on('accountsChanged', function (accounts: string[]) {
			dispatch(connectAccount());
		});
	}
);
