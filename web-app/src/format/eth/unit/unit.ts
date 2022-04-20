import { utils } from "../../../blockchain/web3";

export function weiToEth(wei: string) {
	return utils.fromWei(wei, 'ether');
};

export function ethToWei(ether: string) {
	return utils.toWei(ether, 'ether');
};
