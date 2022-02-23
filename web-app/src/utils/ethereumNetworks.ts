/********
 * This module allows for checking if the connected Ethereum network is supported
 * 
 * It also allows for getting a network name by its Id
 * 
 * Environment variables are necessary
 * 
 * 	name: REACT_APP_SUPPORTED_NETS
 * 
 * 	value: string of supported nets separated by commas
 * 					
 * 		ex: "Mainnet,Goerli,Kovan"
 * 		
 * 		if only one net is supported, there are no commas 
 * 		
 * 		ex: "Mainnet"
 * 
 */

interface netIdsMap {
	[key: string]: number;
};

const netIds:netIdsMap = {
	"Mainnet": 1,
	"Ropsten": 3,
	"Rinkeby": 4,
	"Goerli": 5,
	"Kovan": 42,
	// For Development
	"Truffle": 1337,
	"Ganache": 5777,
};

const supportedNets = process.env.REACT_APP_SUPPORTED_NETS;

export const getSupportedNetsArray = function() {
	return supportedNets!.split(",");
};

export const isNetSupported = function(netId: number) {
	let netsArray: string[] = getSupportedNetsArray();
	let supportedNetIds: number[] = netsArray.map((netName: string) => {
		return netIds[netName];
	})
	let isNetSupported:boolean = supportedNetIds.includes(netId);
	return isNetSupported;
};

export const getNetName = function(netId: number) {
	let netName = Object.keys(netIds).find(key => netIds[key] === netId);
	if(netName) {
		return netName;
	} else {
		return "Network Not Found";
	}
};

export const getNetId = function(netName: string) {
	return netIds[netName];
}
