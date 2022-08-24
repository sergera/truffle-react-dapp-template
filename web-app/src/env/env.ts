/********
 *  This module abstracts the acquisition of environment variables
 * 
 * 	name: REACT_APP_SUPPORTED_CHAINS
 * 
 * 	value: string of supported chains, lower cased, separated by commas
 * 					
 * 		ex: "mainnet,goerli,kovan"
 * 		
 * 		if only one net is supported, there are no commas 
 * 		
 * 		ex: "mainnet"
 * 
 * 	name: REACT_APP_CONTRACTS
 * 
 * 	value: string of contract names, cased exactly like .sol file name, separated by commas
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

export function getBackendURL() {
	return getEnv("BACKEND");
};

export function getConfirmationBlocks() {
	return parseInt(getEnv("CONFIRMATION_BLOCKS"));
};

export function getConfirmationDelaySeconds() {
	return parseInt(getEnv("CONFIRMATION_DELAY_SECONDS"));
};
