import { 
	log 
} from '../../logger';

import { 
	ProviderRpcError 
} from './metamask.types';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;


// user defined type guard
function isProviderRpcError(object: unknown): object is ProviderRpcError {
	return Object.prototype.hasOwnProperty.call(object, "message")
			&& Object.prototype.hasOwnProperty.call(object, "code");
};

export function isConnected() {
	return window.ethereum.isConnected();
};

export async function detectMetamaskProvider() {
	let status = {
		isEnabled: false,
		isSoleProvider: false,
	}

	const { ethereum } = window;

	let provider = null;
	
	if(ethereum) {
		provider = ethereum.isMetaMask ? ethereum : null;

		const { providers } = ethereum as any;
		if(providers) {
			/* if there are multiple providers, window.ethereum could a mixed injected object */
			provider = providers.find((provider: any) => provider.isMetaMask);
		}
	}

	status.isEnabled = !!provider;

	if(status.isEnabled) {
		/* if metamask is enabled check if it is the current injected instance */
		/* if its not enabled it could not be installed, not enabled or 
		could have been enabled in browser but overwritten by another injected provider */
		status.isSoleProvider = provider === window.ethereum;
	}

	return status;
};

export async function requestChainId() {
	const chainIdHex = await window.ethereum.request({method: 'eth_chainId'});
	return chainIdHex;
};

export async function requestAccounts() {
	const accountAdressesArray = await window.ethereum.request({method: 'eth_requestAccounts'});
	return accountAdressesArray;
};

export async function requestChainSwitch(chainId: string) {
	let status = {
		chainInWallet: false,
		successful: false,
	};

	try {
		await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainId }],
		});
		status.successful = true;
		status.chainInWallet = true;
	} catch (switchError) {
		if(isProviderRpcError(switchError)) {
			if (switchError.code === 4902) {
				// This error code indicates that the chain has not been added to MetaMask.
				log({
					sev: 4,
					msg: switchError.message,
					name: "Chain to switch doesn't exist in wallet"
				});
			} else {
				// handle other "switch" errors
				status.chainInWallet = true;
				log({
					sev: 3,
					msg: switchError.message,
					name: "Could not request chain switch"
				});	
			}
		}
	} finally {
		return status;
	}
};

export async function requestChainAdd(chainId: string, chainName: string, rpcUrls: string[]) {
	let chainAddRequestStatus = {
		successful: true,
	}

	try {
		await window.ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [
				{
					chainId: chainId,
					chainName: chainName,
					rpcUrls: rpcUrls /* ['https://...'] */,
				},
			],
		});
	} catch (addError) {
		chainAddRequestStatus.successful = false;
		if(isProviderRpcError(addError)) {
			log({
				sev: 3,
				msg: addError.message,
				name: "Could not request chain add"
			});
		}
	} finally {
		return chainAddRequestStatus;
	}
};

export function setConnectCallback(callback: Function) {
	window.ethereum.on('connect', (connectInfo: { chainId: string }) => {
		callback(connectInfo);
	});
};

export function setDisconnectCallback(callback: Function) {
	window.ethereum.on('disconnect', (error: ProviderRpcError) => {
		callback(error);
	});
};

export function setAccountSwitchCallback(callback: Function) {
	window.ethereum.on('accountsChanged', (accounts: string[]) => {
		callback(accounts);
	});
};

export function setChainSwitchCallback(callback: Function) {
	window.ethereum.on('chainChanged', (chainId: number) => {
		callback(chainId);
	});
};
