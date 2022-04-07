import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestAccounts, setAccountSwitchCallback } from '../../../blockchain/metamask';

import { RootState } from '../..';

export const connectAccount = createAsyncThunk<
	string, // return type
	void, // first argument type
	{ state: RootState }
>(
  'wallet/account/connect',
  async (_,thunkAPI) => {
		let accounts = await requestAccounts();
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
		setAccountSwitchCallback(() => {
			dispatch(connectAccount());
		});
	}
);
