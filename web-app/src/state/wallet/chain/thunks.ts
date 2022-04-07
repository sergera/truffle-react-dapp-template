import { 
	createAsyncThunk 
} from '@reduxjs/toolkit';

import { 
	isConnected,
	requestChainId, 
	requestChainSwitch, 
	setChainSwitchCallback 
} from '../../../blockchain/metamask';
import { 
	isChainSupported, 
	getChainName 
} from '../../../blockchain/chains';
import { 
	setContracts, 
	deleteContracts 
} from '../../../blockchain/contracts';

import { 
	openModal 
} from '../../modal';

import { 
	RootState 
} from '../..';
import { 
	ConnectChainPayload 
} from './chainSlice.types';

export const connectChain = createAsyncThunk<
	ConnectChainPayload, //return type
	void, // first argument type
	{ state: RootState }
>(
	'wallet/chain/connect',
	async(_,thunkAPI) => {
		let { dispatch } = thunkAPI;

		let chainIdHex = await requestChainId();
		let chainIdInt = parseInt(chainIdHex, 16);
		let chainName = getChainName(chainIdInt);
		const chainIdString = chainIdInt.toString();

		let chainConnected = isConnected();
		chainConnected ||	dispatch(openModal("NOT_CONNECTED"));

		let chainSupported = isChainSupported(chainIdInt);
		chainConnected && (chainSupported || dispatch(openModal("SELECT_CHAIN")));
		chainSupported && setContracts(chainIdString);

		return {
			name: chainName,
			id: chainIdString,
			connected: chainConnected,
			supported: chainSupported,
		};
	}
);

export const switchChain = createAsyncThunk<
	void, //return type
	string, // first argument type
	{ state: RootState }
>(
'wallet/chain/requestSwitch',
	async(chainId,thunkAPI) => {
		const { dispatch } = thunkAPI;
		const status = await requestChainSwitch(chainId);
		if(!status.chainInWallet) {
			dispatch(openModal("CHAIN_NOT_ADDED"))
		}
	}
);

export const chainSwitched = createAsyncThunk<
	void, // return type
	void, // first argument type
{ state: RootState }
>(
'wallet/chain/chainSwitched',
async (_,thunkAPI) => {
		let { dispatch } = thunkAPI;
		deleteContracts();
		await dispatch(connectChain());
	}
);

export const setChainListeners = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
'wallet/chain/setListeners',
	async (_,thunkAPI) => {
		let { dispatch } = thunkAPI;
		setChainSwitchCallback(() => {
			dispatch(chainSwitched());
		});
	}
);
