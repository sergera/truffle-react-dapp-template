/********
 * This module allows for checking if the connected Ethereum chain is supported
 * 
 * It also allows for getting a chain name by its Id
 * 
 */

import { 
	getSupportedChains 
} from "../../env";

import { 
	CHAIN_IDS 
} from "./chains.constants";

const supportedChains = getSupportedChains();

export const isChainSupported = function(chainId: number) {
	let supportedChainIds: number[] = supportedChains.map((chainName: string) => {
		return CHAIN_IDS[chainName];
	})
	let isChainSupported:boolean = supportedChainIds.includes(chainId);
	return isChainSupported;
};

export const getChainName = function(chainId: number) {
	let chainName = Object.keys(CHAIN_IDS).find(key => CHAIN_IDS[key] === chainId);
	if(chainName) {
		return chainName;
	} else {
		return "";
	}
};

export const getChainId = function(chainName: string) {
	let chainId = CHAIN_IDS[chainName];
	if(chainId) {
		return chainId
	} else {
		return "";
	}
};

export const getChainIdHex = function(chainName: string) {
	let chainId = CHAIN_IDS[chainName];
	if(chainId) {
		return intToHex(chainId);
	} else {
		return "";
	}
};

export const intToHex = function(integer: number) {
	return `0x${integer.toString(16)}`;
};
