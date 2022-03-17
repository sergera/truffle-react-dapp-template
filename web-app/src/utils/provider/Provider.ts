import Web3 from 'web3';

import store from '../../state/store';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

interface LooseObject {
	[key: string]: any
};

export var contracts: LooseObject = {}

class Provider {

	web3: Web3;

	constructor() {
		this.web3 = new Web3();
	}

	setMetamaskAsProvider() {
		this.web3.setProvider(window.ethereum);
	}

	async _getArtifact(name: string) {
		try {
			const artifact = await import(`../../../build/${name}.json`);
			return artifact;
		} catch(err) {
			throw new Error("Contract doesn't exist");
		}
	}
	
	_getContractAddress(artifact: LooseObject) {
		try {
			const chainId = store.getState().chain.id;
			const deployedNetwork = artifact.networks[chainId];
			return deployedNetwork.address;
		} catch(err) {
			throw new Error("Contract doesn't exist on this chain");
		}
	}

	async _getContract(name: string) {
		let artifact = await this._getArtifact(name);
		let contractAddress = this._getContractAddress(artifact);
		return new this.web3.eth.Contract(
			artifact.abi,
			contractAddress,
		);
	}

	async setContracts() {
		const fs = require('fs');
		const contractNames = fs.readdirSync('../../../build/');
		for(const name of contractNames) {
			contracts[name] = await this._getContract(name);
		}
	}
};

export default new Provider();
