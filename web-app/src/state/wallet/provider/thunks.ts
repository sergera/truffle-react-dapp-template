import { 
	createAsyncThunk 
} from '@reduxjs/toolkit';

import { 
	openModal 
} from '../../modal';

import { 
	setConnectCallback, 
	setDisconnectCallback, 
	isConnected, 
	detectMetamaskProvider 
} from '../../../blockchain/metamask';
import { 
	setMetamaskAsProvider 
} from '../../../blockchain/web3';
import { 
	deleteContracts 
} from '../../../blockchain/contracts';

import { 
	RootState 
} from '../..';

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
		const providerStatus = await detectMetamaskProvider();

		if(!providerStatus.isInstalled) {
			dispatch(openModal("NOT_INSTALLED")); 
			return false;
		}

		if(!providerStatus.isSoleProvider) {
			dispatch(openModal("MULTIPLE_PROVIDERS"));
			return false;
		}
		
		let metamaskIsConnected = isConnected();
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

		setConnectCallback((connectInfo: { chainId: string }) => {
			console.log(`connected to chain ${connectInfo.chainId}`);
		});

		setDisconnectCallback(() => {
			dispatch(providerDisconnected());
		});
	}
);
