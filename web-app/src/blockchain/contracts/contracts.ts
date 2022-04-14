/********
 * This module provides contract artifacts for the currently connected chain
 * 
 */
import { 
	getWeb3,
	AbiItem,
	Contract,
 } from '../web3';
import {
	Log
} from '../../logger';
import {
	getErrorMessage
} from '../../error';

import { 
	getContractNames 
} from '../../env';

import { 
	LooseObject 
} from '../../types';
import {
	ContractMap,
} from './contracts.types';


var contracts: ContractMap = {};

export function getContracts(): ContractMap {
	return contracts;
};

export function deleteContracts(): void {
	contracts = {};
};

export function checkAllContractsAcquired(): boolean {
	const contractNames: string[] = getContractNames();
	return contractNames.length === Object.keys(contracts).length;
};

export async function setContracts(chainId: string): Promise<void> {
	try {
		contracts = await fetchContracts(chainId);
	} catch(err) {
		deleteContracts();
	}
};

async function fetchContracts(chainId: string): Promise<ContractMap> {
	let contractMap = {};
	const contractNames: string[] = getContractNames();
	const contracts: ContractMap[] = await Promise.all(
		contractNames.map(async function (name: string): Promise<ContractMap> {		
			let contract = await fetchContractWithNameInChain(name, chainId);
			return {[name]: contract};
		})
	);

	Object.assign(contractMap, ...contracts);
	return contractMap;
};

async function fetchContractWithNameInChain(name: string, chainId: string): Promise<Contract> {
	let artifact = await fetchContractArtifact(name);
	let contractAddress = fetchContractAddressInChain(artifact, chainId);
	return instanceContract(artifact.abi, contractAddress);
};

async function fetchContractArtifact (name: string): Promise<LooseObject> {
	try {
		return await import(`../../../../build/contracts/${name}.json`);
	} catch(err) {
		Log.error({msg: getErrorMessage(err), description: "Contract artifact doesn't exist"});
		throw err;
	}
};

function fetchContractAddressInChain (artifact: LooseObject, chainId: string): string {
	try {
		return artifact.networks[chainId].address;
	} catch(err) {
		Log.error({msg: getErrorMessage(err), description: "Contract doesn't exist on this chain"});
		throw err;
	}
};

function instanceContract(contractAbi: AbiItem, contractAddress: string): Contract  {
	let web3 = getWeb3();
	try {
		return new web3.eth.Contract(contractAbi, contractAddress);
	} catch(err) {
		Log.error({msg: getErrorMessage(err), description: "Contract ABI incorrect"});
		throw err;
	}
};
