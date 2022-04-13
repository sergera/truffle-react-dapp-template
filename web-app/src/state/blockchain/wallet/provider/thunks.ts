import { 
	createAsyncThunk 
} from '@reduxjs/toolkit';

import { 
	openModal 
} from '../../../modal';

import { 
	metamask
} from '../../../../blockchain/metamask';
import { 
	setWeb3Provider 
} from '../../../../blockchain/web3';
import { 
	deleteContracts 
} from '../../../../blockchain/contracts';

import { 
	RootState 
} from '../../..';

export const connectProvider = createAsyncThunk<
	boolean, // return type
	void, // first argument type
	{ state: RootState }
>(
  'blockchain/wallet/provider/connect',
  async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		const provider = metamask.acquireProvider();

		if(!provider) {
			dispatch(openModal("DISABLED")); 
			return false;
		}
		
		setWeb3Provider(provider);
		return true;
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
		metamask.setConnectCallback((connectInfo: { chainId: string }) => {
			console.log(`connected to chain ${connectInfo.chainId}`);
		});
		metamask.setDisconnectCallback(() => {
			dispatch(providerDisconnected());
		});
	}
);
