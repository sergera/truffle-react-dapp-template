/********
 * Map of chain ids by name
 * 
 *  For future reference, access:
 * 	https://chainlist.org/ for chainIds
 *  https://rpc.info/ for RPC URLs
 * 
 */

import { ChainIdsMap } from './chains.types';

export const CHAIN_IDS: ChainIdsMap = {
	"mainnet": 1,
	"goerli": 5,
	"sepolia": 11155111,
	// For Development
	"truffle": 1337,
	"ganache": 5777,
};
