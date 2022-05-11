/********
 * Test errors thrown by contract 
 * 
 * Usage:
 * 		const expectThrow = require('./utils/expectThrow');
 *    let contract = await MyContract.deployed();
 *    let tx = contract.someFunc(inputParam, {from: accounts[0]}); 
 * 		await expectThrow(tx);
 * 
 */

module.exports =  async (promise) => {
	try {
			await promise;
	} catch (err) {
			return;
	}
	assert(false, 'Expected throw not received');
};
