/********
 * Format strings for submission
 * 
 */

 import { utils } from "../../blockchain/web3";

export function toCapitalizedName(name: string) {
	const lowerTrimmed = toLowerTrim(name);
	const nameArray = lowerTrimmed.split(" ");
	let capitalizedArray = [];
	for(let word in nameArray) {
		capitalizedArray.push(
			nameArray[word].charAt(0).toUpperCase() + nameArray[word].slice(1)
		);
	}
	return capitalizedArray.join(" ");
};

export function toLowerTrim(str: string) {
	return str.trim().toLowerCase();
};

export function stringToAsciiHex(str: string) {
	return utils.asciiToHex(str);
};

export function asciiHexToString(hex: string) {
	return utils.hexToAscii(hex);
};
