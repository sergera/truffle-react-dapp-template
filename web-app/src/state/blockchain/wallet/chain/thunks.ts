import { createAsyncThunk } from '@reduxjs/toolkit';

import { checkConnection } from '../../connection';
import { setContractAcquired } from '../../contract';
import { openModal } from '../../../modal';

import { metamask } from '../../../../blockchain/metamask';
import { isChainSupported, getChainName } from '../../../../blockchain/chains';
import { setContracts, deleteContracts,	checkAllContractsAcquired } from '../../../../blockchain/contracts';

import { MODAL_TYPES } from '../../../modal';

import { RootState } from '../../..';
import { ConnectChainPayload } from './chainSlice.types';

export const connectChain = createAsyncThunk<
	ConnectChainPayload, //return type
	void, // first argument type
	{ state: RootState }
>(
	"blockchain/wallet/chain/connect",
	async(_,thunkAPI) => {
		const { dispatch } = thunkAPI;

		const chainIdHex = await metamask.requestChainId();
		const chainIdInt = parseInt(chainIdHex, 16);
		const chainName = getChainName(chainIdInt);
		const chainIdString = chainIdInt.toString();

		const chainIsConnected = metamask.isConnected();
		chainIsConnected ||	dispatch(openModal(MODAL_TYPES.notConnected));

		const chainIsSupported = isChainSupported(chainIdInt);
		if(chainIsSupported) {
			await setContracts(chainIdString);
			const contractsAcquired = checkAllContractsAcquired();
			await dispatch(setContractAcquired(contractsAcquired));
		}

		return {
			name: chainName,
			id: chainIdString,
			isConnected: chainIsConnected,
			isSupported: chainIsSupported,
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
		const status = await metamask.requestChainSwitch(chainId);
		if(!status.chainInWallet) {
			dispatch(openModal(MODAL_TYPES.chainNotAdded));
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
		metamask.setChainSwitchCallback(() => {
			dispatch(chainSwitched());
		});
	}
);
