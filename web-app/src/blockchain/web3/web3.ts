import Web3 from 'web3';

import { getConfirmationBlocks } from '../../env';

var web3 = new Web3();
const confirmationMultiplier = 10;
/* 
	confirmation multiplier:
	web3js confirmation callback through http currently does not fire on confirmation,
	instead it fires on some arbitrary condition that is unknown to me as of yet,
	the limit must then be expanded to make sure that it will fire enough times
	to cover the confirmation blocks environment variable
*/
web3.eth.transactionConfirmationBlocks = getConfirmationBlocks() * confirmationMultiplier;

export function setWeb3Provider(provider: any) {
	web3.setProvider(provider);
};

export function getWeb3() {
	return web3;
};
