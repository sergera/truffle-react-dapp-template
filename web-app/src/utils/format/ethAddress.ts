export const checkSumFormat = function(ethAddress: string) {
	let hexFlag = ethAddress.substring(0,2);
	let unformattedAddress = ethAddress.substring(2);
	console.log(`HEX FLAG: ${hexFlag}`);
	console.log(`UNFORMATTED ADDRESS: ${unformattedAddress}`)
};
