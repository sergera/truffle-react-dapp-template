/********
 * Format strings for submission
 * 
 */

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
