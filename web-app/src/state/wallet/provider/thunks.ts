import detectEthereumProvider from '@metamask/detect-provider';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { openModal } from '../../modal';

import { setMetamaskAsProvider } from '../../../blockchain/web3';
import { deleteContracts } from '../../../blockchain/contracts';

import { RootState } from '../..';
import { ProviderRpcError } from '../../../types';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

export const connectProvider = createAsyncThunk<
	boolean, // return type
	void, // first argument type
	{ state: RootState }
>(
  'wallet/provider/connect',
  async (_,thunkAPI) => {
		let { dispatch } = thunkAPI;
		const provider = await detectEthereumProvider({
			mustBeMetaMask: true
		});

		let metamaskInstalled = !!provider;
		if(!metamaskInstalled) {
			dispatch(openModal("NOT_INSTALLED")); 
			return false;
		}
		let thereIsOnlyMetamask = provider === window.ethereum;
		if(!thereIsOnlyMetamask) {
			dispatch(openModal("MULTIPLE_PROVIDERS"));
			return false;
		}
		let metamaskIsConnected = window.ethereum.isConnected();
		if(!metamaskIsConnected) {
			dispatch(openModal("NOT_CONNECTED"));
			return false;
		}
		
		setMetamaskAsProvider();
		return true;
  }
);

export const providerDisconnected = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
  'wallet/provider/disconnected',
  async (_,thunkAPI) => {
		let { dispatch } = thunkAPI;
		deleteContracts();
		dispatch(openModal("DISCONNECTED"));
  }
);

export const setProviderListeners = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
'wallet/provider/setListeners',
	async (_,thunkAPI) => {
		let { dispatch } = thunkAPI;
		window.ethereum.on('connect', (connectInfo: { chainId: string }) => {
			console.log(`connected to chain ${connectInfo.chainId}`)
		});

		window.ethereum.on('disconnect', (error: ProviderRpcError) => {
			dispatch(providerDisconnected());
		});
	}
);
