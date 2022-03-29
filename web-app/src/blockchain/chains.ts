/********
 * This module allows for checking if the connected Ethereum chain is supported
 * 
 * It also allows for getting a chain name by its Id
 * 
 */

import { getSupportedChains } from "../utils/env";
import chainIds from "../constants/chains";

const supportedChains = getSupportedChains();

export const isChainSupported = function(chainId: number) {
	let supportedNetIds: number[] = supportedChains.map((chainName: string) => {
		return chainIds[chainName];
	})
	let isChainSupported:boolean = supportedNetIds.includes(chainId);
	return isChainSupported;
};

export const getChainName = function(chainId: number) {
	let chainName = Object.keys(chainIds).find(key => chainIds[key] === chainId);
	if(chainName) {
		return chainName;
	} else {
		return "Not Found";
	}
};

export const getChainId = function(chainName: string) {
	let chainId = chainIds[chainName];
	if(chainId) {
		return chainId
	} else {
		return "Not Found";
	}
};

export const getChainIdHex = function(chainName: string) {
	let chainId = chainIds[chainName];
	if(chainId) {
		return intToHex(chainId);
	} else {
		return "Not Found";
	}
};

export const intToHex = function(integer: number) {
	return `0x${integer.toString(16)}`;
};
