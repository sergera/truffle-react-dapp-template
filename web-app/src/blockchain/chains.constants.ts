/**********
 * Map of chain ids by name
 * 
 *  For future reference, access:
 * 	https://chainlist.org/ for chainIds
 *  https://rpc.info/ for RPC URLs
 * 
 */

 import { ChainIdsMap } from './chains.types';

 const chainIds:ChainIdsMap = {
	 "Mainnet": 1,
	 "Ropsten": 3,
	 "Rinkeby": 4,
	 "Goerli": 5,
	 "Kovan": 42,
	 // For Development
	 "Truffle": 1337,
	 "Ganache": 5777,
 };
 
 export default chainIds;
 