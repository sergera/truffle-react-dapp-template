import { 
	Log 
} from '../../logger';

import { 
	IInjectedProviderApi,
	ProviderRpcError 
} from './metamask.types';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

// user defined type guard
function isProviderRpcError(object: unknown): object is ProviderRpcError {
	return Object.prototype.hasOwnProperty.call(object, "message")
			&& Object.prototype.hasOwnProperty.call(object, "code");
};

class Metamask implements IInjectedProviderApi {

	provider: any;

	constructor() {
		this.provider = null;
	}

	isConnected() {
		return this.provider.isConnected();
	};

	acquireProvider() {
		let provider = null;

		const {ethereum} = window;
		if(ethereum) {
			provider = ethereum.isMetaMask ? ethereum : null;

			const {providers} = ethereum as any;
			if(providers) {
				/* if there are multiple providers, window.ethereum could a mixed injected object */
				provider = providers.find((provider: any) => provider.isMetaMask);
			}
		}
		
		this.provider = provider;

		return provider;
	};

	async requestChainId() {
		const chainIdHex = await this.provider.request({method: 'eth_chainId'});
		return chainIdHex;
	};

	async requestAccounts() {
		const accountAdressesArray = await this.provider.request({method: 'eth_requestAccounts'});
		return accountAdressesArray;
	};

	async requestChainSwitch(chainIdHex: string) {
		let status = {
			chainInWallet: false,
		};

		try {
			await this.provider.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainIdHex }],
			});
			status.chainInWallet = true;
		} catch (switchError) {
			if(isProviderRpcError(switchError)) {
				if (switchError.code === 4902) {
					// This error code indicates that the chain has not been added to MetaMask.
					Log.info({
						msg: switchError.message,
						description: "Chain to switch doesn't exist in wallet"
					});
				} else {
					// handle other "switch" errors
					status.chainInWallet = true;
					Log.warn({
						msg: switchError.message,
						description: "Could not request chain switch"
					});	
				}
			}
		} finally {
			return status;
		}
	};

	async requestChainAdd(chainIdHex: string, chainName: string, rpcUrls: string[]) {
		try {
			await this.provider.request({
				method: 'wallet_addEthereumChain',
				params: [
					{
						chainId: chainIdHex,
						chainName: chainName,
						rpcUrls: rpcUrls /* ['https://...'] */,
					},
				],
			});
		} catch (addError) {
			if(isProviderRpcError(addError)) {
				Log.warn({
					msg: addError.message,
					description: "Could not request chain add"
				});
			}
		}
	};

	setConnectCallback(callback: Function) {
		this.provider.on('connect', (connectInfo: { chainId: string }) => {
			callback(connectInfo);
		});
	};

	setDisconnectCallback(callback: Function) {
		this.provider.on('disconnect', (error: ProviderRpcError) => {
			callback(error);
		});
	};

	setAccountSwitchCallback(callback: Function) {
		this.provider.on('accountsChanged', (accounts: string[]) => {
			callback(accounts);
		});
	};

	setChainSwitchCallback(callback: Function) {
		this.provider.on('chainChanged', (chainId: number) => {
			callback(chainId);
		});
	};
};

export const metamask = new Metamask();
