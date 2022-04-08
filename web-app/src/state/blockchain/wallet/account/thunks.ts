import { 
	createAsyncThunk 
} from '@reduxjs/toolkit';

import {
	checkConnection
} from '../../connection';

import { 
	requestAccounts, 
	setAccountSwitchCallback 
} from '../../../../blockchain/metamask';

import { 
	RootState 
} from '../../..';

export const connectAccount = createAsyncThunk<
	string, // return type
	void, // first argument type
	{ state: RootState }
>(
  "blockchain/wallet/account/connect",
  async (_,thunkAPI) => {
		const accounts = await requestAccounts();
		return accounts[0];
  }
);

export const accountSwitched = createAsyncThunk<
	void, // return type
	void, // first argument type
{ state: RootState }
>(
	"blockchain/wallet/account/switched",
	async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		await dispatch(connectAccount());
		await dispatch(checkConnection());
	}
);

export const setAccountListeners = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
	"blockchain/wallet/account/setListeners",
	async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		setAccountSwitchCallback(() => {
			dispatch(accountSwitched());
		});
	}
);
