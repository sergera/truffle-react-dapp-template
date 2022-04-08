import { 
	createAsyncThunk 
} from '@reduxjs/toolkit';

import {
	checkConnection
} from '../../connection';
import {
	setContractAcquired
} from '../../contract';
import { 
	openModal 
} from '../../../modal';

import { 
	isConnected,
	requestChainId, 
	requestChainSwitch, 
	setChainSwitchCallback 
} from '../../../../blockchain/metamask';
import { 
	isChainSupported, 
	getChainName 
} from '../../../../blockchain/chains';
import { 
	setContracts, 
	deleteContracts 
} from '../../../../blockchain/contracts';

import { 
	RootState 
} from '../../..';
import { 
	ConnectChainPayload 
} from './chainSlice.types';

export const connectChain = createAsyncThunk<
	ConnectChainPayload, //return type
	void, // first argument type
	{ state: RootState }
>(
	"blockchain/wallet/chain/connect",
	async(_,thunkAPI) => {
		const { dispatch } = thunkAPI;

		const chainIdHex = await requestChainId();
		const chainIdInt = parseInt(chainIdHex, 16);
		const chainName = getChainName(chainIdInt);
		const chainIdString = chainIdInt.toString();

		const chainConnected = isConnected();
		chainConnected ||	dispatch(openModal("NOT_CONNECTED"));

		const chainSupported = isChainSupported(chainIdInt);
		if(chainSupported) {
			const contractsSet = await setContracts(chainIdString);
			await dispatch(setContractAcquired(contractsSet));
		}

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
	"blockchain/wallet/chain/switch",
	async(chainId,thunkAPI) => {
		const { dispatch } = thunkAPI;
		const status = await requestChainSwitch(chainId);
		if(!status.chainInWallet) {
			dispatch(openModal("CHAIN_NOT_ADDED"));
		}
	}
);

export const chainSwitched = createAsyncThunk<
	void, // return type
	void, // first argument type
{ state: RootState }
>(
	"blockchain/wallet/chain/switched",
	async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		deleteContracts();
		await dispatch(connectChain());
		await dispatch(checkConnection());
	}
);

export const setChainListeners = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
	"blockchain/wallet/chain/setListeners",
	async (_,thunkAPI) => {
		const { dispatch } = thunkAPI;
		setChainSwitchCallback(() => {
			dispatch(chainSwitched());
		});
	}
);
