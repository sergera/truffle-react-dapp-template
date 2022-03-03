import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

// import { accountChanged, networkChanged } from '../state';
import store from '../state/store';
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