/*******
 *  This module abstracts the acquisition of environment variables
 * 
 * 	name: REACT_APP_SUPPORTED_CHAINS
 * 
 * 	value: string of supported chains, pascal cased, separated by commas
 * 					
 * 		ex: "Mainnet,Goerli,Kovan"
 * 		
 * 		if only one net is supported, there are no commas 
 * 		
 * 		ex: "Mainnet"
 * 
 * 	name: REACT_APP_CONTRACTS
 * 
 * 	value: string of contract names, separated by commas
 * 					
 * 		ex: "ContractOne,ContractTwo,ContractThree"
 * 		
 * 		if there is only one contract, there are no commas 
 * 		
 * 		ex: "ContractOne"
 * 
 */

export function getPublicUrl() {
	return process.env.PUBLIC_URL;
};

export function getEnv(varName: string) {
	const environmentVariable = process.env[`REACT_APP_${varName}`];
	if (environmentVariable === undefined) {
		throw new Error(`Missing required environment variable ${varName}`);
	}
	return environmentVariable;
};

export function getEnvList(varName: string, separator: string) {
	try {
		const envString = getEnv(varName);
		const envArray = envString.split(separator);
		if(envArray.length > 0) {
			return envArray;
		}
		return [];
	} catch(err) {
		return [];
	}
};

export function getSupportedChains() {
	return getEnvList("SUPPORTED_CHAINS",",");
};

export function getContractNames() {
	return getEnvList("CONTRACTS",",");
};
