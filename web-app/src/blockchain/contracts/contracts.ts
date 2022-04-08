/********
 * This module provides contract artifacts for the currently connected chain
 * 
 */

import { getWeb3 } from '../web3';

import { getContractNames } from '../../env';

import { LooseObject } from '../../types';

var contracts: LooseObject = {};

async function getArtifact (name: string) {
	try {
		const artifact = await import(`../../../../build/contracts/${name}.json`);
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
	let web3 = getWeb3();
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
	const contractNames = getContractNames();
	try {
		for(const name of contractNames) {
			contracts[name] = await getContract(name, chainId);
		}
		return true;
	} catch(err) {
		deleteContracts();
		return false;
	}
};

export function deleteContracts() {
	contracts = {};
};

export function getContracts() {
	return contracts;
};
