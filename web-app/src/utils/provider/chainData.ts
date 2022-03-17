/********
 * This module allows for checking if the connected Ethereum chain is supported
 * 
 * It also allows for getting a chain name by its Id
 * 
 * Environment variables are necessary
 * 
 * 	name: REACT_APP_SUPPORTED_CHAINS
 * 
 * 	value: string of supported chains, pascal cased, separated by commas
 * 					
 * 		ex: "Mainnet,Goerli,Kovan"
 * 		
 * 		if only one net is supported, there are no commas 
 * 		
 * 		ex: "Mainnet"
 * 
 * 
 *  For future reference, access:
 * 	https://chainlist.org/ for chainIds
 *  https://rpc.info/ for RPC URLs
 * 
 */

interface ChainIdsMap {
	[key: string]: number;
};

const chainIds:ChainIdsMap = {
	"Mainnet": 1,
	"Ropsten": 3,
	"Rinkeby": 4,
	"Goerli": 5,
	"Kovan": 42,
	// For Development
	"Truffle": 1337,
	"Ganache": 5777,
};

const supportedNets = process.env.REACT_APP_SUPPORTED_CHAINS;

export const getSupportedChainsArray = function() {
	return supportedNets!.split(",");
};

export const isChainSupported = function(chainId: number) {
	let netsArray: string[] = getSupportedChainsArray();
	let supportedNetIds: number[] = netsArray.map((chainName: string) => {
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
