import { utils } from '../../../blockchain/web3';

export const toCheckSum = (ethAdress: string) => {
	return utils.toChecksumAddress(ethAdress);
};

export const minify = (ethAdress: string) => {
	let beggining = ethAdress.substring(0,6);
	let end = ethAdress.slice(-4);
	return beggining + "..." + end;
};
