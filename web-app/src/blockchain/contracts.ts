/********
 * This module provides contract artifacts for the currently connected chain
 * 
 */

import web3 from './web3';

import { getContractNames } from '../utils/env';

import { LooseObject } from '../types';

var contracts: LooseObject = {};

const contractNames = getContractNames();

async function getArtifact (name: string) {
	try {
		const artifact = await import(`../../../../build/contracts/${name}`);
		return artifact;
	} catch(err) {
		throw new Error("Contract doesn't exist");
	}
};

function getContractAddress (artifact: LooseObject, chainId: string) {
	try {
		const deployedNetwork = artifact.networks[chainId];
		return deployedNetwork.address;
	} catch(err) {
		throw new Error("Contract doesn't exist on this chain");
	}
};

async function getContract (name: string, chainId: string) {
	let artifact = await getArtifact(name);
	let contractAddress = getContractAddress(artifact, chainId);
	try {
		return new web3.eth.Contract(
			artifact.abi,
			contractAddress,
		);
	} catch(err) {
		throw new Error("Contract ABI incorrect");
	}
};

export async function setContracts(chainId: string) {
	console.log(contractNames)
	try {
		for(const name of contractNames) {
			contracts[name] = await getContract(name, chainId);
		}	
	} catch(err) {
		deleteContracts();
		console.log(err);
	}
};

export function deleteContracts() {
	contracts = {};
};

export default contracts;
