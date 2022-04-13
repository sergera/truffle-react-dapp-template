import Web3 from 'web3';

var web3 = new Web3();

export function setWeb3Provider(provider: any) {
	web3.setProvider(provider);
};

export function getWeb3() {
	return web3;
};
