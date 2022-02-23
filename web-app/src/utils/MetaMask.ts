import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import { store, changeNet, changeAccount, correctNet } from '../state';
import { checkSupportedNets, getNetName } from './ethereumNetworks';
import getErrorMessage from './getErrorMessage';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

// interface for MetaMask errors
interface ProviderRpcError extends Error {
	message: string;
	code: number;
	data?: unknown;
}

// user defined type guard
function isProviderRpcError(object: unknown): object is ProviderRpcError {
	return Object.prototype.hasOwnProperty.call(object, "message")
			&& Object.prototype.hasOwnProperty.call(object, "code");
}

class MetaMask {

	web3: Web3;
	netId: number = -1;
	accounts: string[] = ["N/A"];
	activeAccount: string = "N/A";
	listenersSet: boolean = false;

	constructor() {
		this.web3 = new Web3();
	}

	async connect() {
		await this.connectProvider();
		await this.connectNetwork();
		await this.connectAccounts();
		if(!this.listenersSet) {
			this.setAccountListener();
			this.setChainListener();
			this.setConnectListener();
			this.setDisconnectListener();
			this.listenersSet = true;
		}
	}

	disconnect() {
		store.dispatch(changeAccount(""));
		store.dispatch(changeNet(""));
		store.dispatch(correctNet(false));
	}

	async connectProvider() {
		const provider = await detectEthereumProvider({
			mustBeMetaMask: true
		});

		if (provider) {
			if(provider === window.ethereum) {
				// use MetaMask's provider
				this.web3 = new Web3(window.ethereum);
			} else {
				alert("Please have only one provider injecting wallet enabled!");
			}
		} else {
			alert("Please install MetaMask!");
		}
	}

	async connectNetwork() {
		this.netId = await this.web3.eth.net.getId();
		let netName = getNetName(this.netId);
		store.dispatch(changeNet(netName));
		let netIsSupported = checkSupportedNets(this.netId);
		store.dispatch(correctNet(netIsSupported));
	}

	async connectAccounts() {
		this.accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
		this.activeAccount = this.accounts[0];
		store.dispatch(changeAccount(this.activeAccount));
	}

	async requestNetSwitch(netId: number) {		
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0xf00' }],
			});
		} catch (switchError) {
			if(isProviderRpcError(switchError)) {
				if (switchError.code === 4902) {
					// This error code indicates that the chain has not been added to MetaMask.
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainId: '0xf00',
									chainName: '...',
									rpcUrls: ['https://...'] /* ... */,
								},
							],
						});
					} catch (addError) {
						// handle "add" error
					}
				}
				// handle other "switch" errors
			} else {
				// If thrown error is not in the MetaMask standard
				// or if thrown object is not an error at all
				console.log(getErrorMessage(switchError))
			}
		}
	}

	setAccountListener() {
		let self = this;
		window.ethereum.on('accountsChanged', function (accounts: string[]) {
			// Time to reload your interface with accounts[0]!
			self.connect();
		});
	}

	setChainListener() {
		let self = this;
		window.ethereum.on('chainChanged', (chainId: number) => {
			// Handle the new chain.
			// Correctly handling chain changes can be complicated.
			// We recommend reloading the page unless you have good reason not to.
			// window.location.reload();
			self.connect();
		});
	}

	setConnectListener() {
		interface ConnectInfo {
			chainId: string;
		}

		window.ethereum.on('connect', (connectInfo: ConnectInfo) => {
			console.log(`connected to chain ${connectInfo.chainId}`)
		})
	}

	setDisconnectListener() {
		let self = this;
		window.ethereum.on('disconnect', (error: ProviderRpcError) => {
			console.log(error);
			self.disconnect();
		})
	}

	async getContract(name: string) {
		const artifact = await import(`../../../build/${name}.json`);
		const deployedNetwork = artifact.networks[this.netId];
		return new this.web3.eth.Contract(
			artifact.abi,
			deployedNetwork.address,
		)
	}
}

export default new MetaMask();