import { 
	createAsyncThunk 
} from '@reduxjs/toolkit';

import { 
	openModal 
} from '../../../modal';

import { 
	setConnectCallback, 
	setDisconnectCallback,
	detectMetamaskProvider 
} from '../../../../blockchain/metamask';
import { 
	setMetamaskAsProvider 
} from '../../../../blockchain/web3';
import { 
	deleteContracts 
} from '../../../../blockchain/contracts';

import { 
	RootState 
} from '../../..';
import {
	ConnectProviderPayload
} from './providerSlice.types';

export const connectProvider = createAsyncThunk<
	ConnectProviderPayload, // return type
	void, // first argument type
	{ state: RootState }
>(
  'blockchain/wallet/provider/connect',
  async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		const providerStatus = await detectMetamaskProvider();

		if(!providerStatus.isInstalled) {
			dispatch(openModal("NOT_INSTALLED")); 
			return {
				metamaskInstalled: false,
				metamaskOnly: false,
			};
		}

		if(!providerStatus.isSoleProvider) {
			dispatch(openModal("MULTIPLE_PROVIDERS"));
			return {
				metamaskInstalled: true,
				metamaskOnly: false,
			};
		}
		
		setMetamaskAsProvider();
		return {
			metamaskInstalled: true,
			metamaskOnly: true,
		};
  }
);

export const providerDisconnected = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
  'blockchain/wallet/provider/disconnected',
  async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		deleteContracts();
		dispatch(openModal("DISCONNECTED"));
  }
);

export const setProviderListeners = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
	"blockchain/wallet/provider/setListeners",
	async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		setConnectCallback((connectInfo: { chainId: string }) => {
			console.log(`connected to chain ${connectInfo.chainId}`);
		});
		setDisconnectCallback(() => {
			dispatch(providerDisconnected());
		});
	}
);
