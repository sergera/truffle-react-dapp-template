import Web3 from 'web3';

// stop typescript from trying to predict injected window.ethereum methods
declare var window: any;

var web3 = new Web3();

export function setMetamaskAsProvider() {
	web3.setProvider(window.ethereum);
};

export default web3;
