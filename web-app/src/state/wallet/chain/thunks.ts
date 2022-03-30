import { createAsyncThunk } from '@reduxjs/toolkit';

import { isChainSupported, getChainName } from '../../../blockchain/chains';
import { setContracts, deleteContracts } from '../../../blockchain/contracts';
import getErrorMessage from '../../../exception/getErrorMessage';

import { RootState } from '../../store';
import { openModal } from '../../modal/modalSlice';
import { ProviderRpcError } from '../../../types';
import { ConnectChainPayload } from './chainSlice.types';

// user defined type guard
function isProviderRpcError(object: unknown): object is ProviderRpcError {
	return Object.prototype.hasOwnProperty.call(object, "message")
			&& Object.prototype.hasOwnProperty.call(object, "code");
};

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

export const connectChain = createAsyncThunk<
	ConnectChainPayload, //return type
	void, // first argument type
	{ state: RootState }
>(
	'wallet/chain/connect',
	async(_,thunkAPI) => {
		let { dispatch } = thunkAPI;

		let chainIdHex = await window.ethereum.request({method: 'eth_chainId'});
		let chainIdInt = parseInt(chainIdHex, 16);
		let chainName = getChainName(chainIdInt);
		let chainSupported = isChainSupported(chainIdInt);

		const chainIdString = chainIdInt.toString();

		chainSupported || dispatch(openModal("SELECT_CHAIN"));
		chainSupported && setContracts(chainIdString);

		return {
			name: chainName,
			id: chainIdString,
			supported: chainSupported,
		};
	}
);

export const requestChainSwitch = createAsyncThunk<
	void, //return type
	string, // first argument type
	{ state: RootState }
>(
'wallet/chain/requestSwitch',
	async(chainId,thunkAPI) => {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainId }],
			});
		} catch (switchError) {
			if(isProviderRpcError(switchError)) {
				// if (switchError.code === 4902) {
				// This error code indicates that the chain has not been added to MetaMask.
				// 	try {
				// 		await window.ethereum.request({
				// 			method: 'wallet_addEthereumChain',
				// 			params: [
				// 				{
				// 					chainId: chainId,
				// 					chainName: '...',
				// 					// rpcUrls: ['https://...'] /* ... */,
				// 				},
				// 			],
				// 		});
				// 	} catch (addError) {
				// 		// handle "add" error
				// 	}
				// }
				// handle other "switch" errors
				console.log(switchError);
			} else {
				// If thrown error is not in the MetaMask standard
				// or if thrown object is not an error at all
				console.log(getErrorMessage(switchError))
			}
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
		window.ethereum.on('chainChanged', (chainId: number) => {
			// Handle the new chain.
			// Correctly handling chain changes can be complicated.
			// We recommend reloading the page unless you have good reason not to.
			// window.location.reload();
			dispatch(chainSwitched());
		});
	}
);