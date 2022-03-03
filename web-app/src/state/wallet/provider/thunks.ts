import detectEthereumProvider from '@metamask/detect-provider';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { openModal } from '../../modal/modalSlice';

import { ProviderRpcError } from '../types';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

export const connectProvider = createAsyncThunk<
	boolean, // return type
	void, // first argument type
	{ state: RootState }
>(
  'wallet/provider/connect',
  async (_,thunkAPI) => {
		const provider = await detectEthereumProvider({
			mustBeMetaMask: true
		});

		let metamaskInstalled = !!provider;
		metamaskInstalled || thunkAPI.dispatch(openModal("NOT_INSTALLED"));
		let thereIsOnlyMetamask = provider === window.ethereum;
		thereIsOnlyMetamask || thunkAPI.dispatch(openModal("MULTIPLE_PROVIDERS"));
		let metamaskIsConnected = window.ethereum.isConnected();
		metamaskIsConnected || thunkAPI.dispatch(openModal("NOT_CONNECTED"));

		let statusOk = metamaskInstalled && thereIsOnlyMetamask && metamaskIsConnected;
		return statusOk;
  }
);

export const providerDisconnected = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
  'wallet/provider/disconnected',
  async (_,thunkAPI) => {
		thunkAPI.dispatch(openModal("DISCONNECTED"));
  }
);

export const setProviderListeners = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
'wallet/provider/setListeners',
	async (_,thunkAPI) => {

		window.ethereum.on('connect', (connectInfo: { chainId: string }) => {
			console.log(`connected to chain ${connectInfo.chainId}`)
		});

		window.ethereum.on('disconnect', (error: ProviderRpcError) => {
			thunkAPI.dispatch(providerDisconnected());
		});
	}
);
