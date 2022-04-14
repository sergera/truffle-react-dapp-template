import { getWeb3 } from "../../../blockchain/web3";

const web3 = getWeb3();

export function weiToEth(wei: string) {
	return web3.utils.fromWei(wei, 'ether');
};

export function ethToWei(ether: string) {
	return web3.utils.toWei(ether, 'ether');
};
