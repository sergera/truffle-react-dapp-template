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
	 "ropsten": 3,
	 "rinkeby": 4,
	 "goerli": 5,
	 "kovan": 42,
	 // For Development
	 "truffle": 1337,
	 "ganache": 5777,
 };
 