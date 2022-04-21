// import 'babel-polyfill';

// Truffle provides a clean room environment when running test files
// Truffle redeploys all migrations at the beggining of test file when running tests against ganache or truffle develop
// web3 instance is automatically avaiable in each test file
// Truffle comes with mocha and chai
// mocha: testing framework (organize/run tests)
// it - test case
// describe - group similar "it" functions
// beforeEach - generic setup code
// afterEach - generic cleanup code
// chai: assertion library
// assertion - compare two value

// contract abstractions (JSON representations) are needed to interact with the contract through js tests
// truffle artifacts library gives us those abstractions
// artifact is a JSON representation of the contract
const Notes = artifacts.require("Notes");

let accounts; // List of development accounts provided by Truffle
let owner; // Global variable use it in the tests cases

// This calls the Smart contract and initializes it
// "contract" keyword works like "describe" and "beforeEach" from Mocha
// but it provides truffle's clean room features (redeploys contracts on each "contract" function call)
// clean contract state means there's no need for a "beforeEach" block
contract("Notes", (accs) => { // first argument is descriptive of the test, second argument is a callback that gets all available accounts as argument
	accounts = accs; // contract function provides a list of accounts available
	owner = accounts[0];

	const testTitle1 = "Test Title 1";
	const testContent1 = "Test content 1";
	const testTitle2 = "Test Title 2";
	const testContent2 = "Test content 2";

	// Example test cases, test if the contract is able to return the name and symbol property 
	// initialized in the contract constructor
	it("has correct name", async () => {
		/* Making sure the Smart Contract is deployed and getting the instance */
		let instance = await Notes.deployed();
		/* Calling the name property (basic function call, state variable getter function is a view) */
		let tokenName = await instance.name.call();
		/* Assert if the token name property was initialized correctly */
		assert.equal(tokenName, "Notes");
	});

	it("has correct symbol", async () => {
		/* Making sure the Smart Contract is deployed and getting the instance */
		let instance = await Notes.deployed();
		/* Calling the symbol property (basic function call, state variable getter function is a view) */
		let tokenSymbol = await instance.symbol.call();
		/* Assert if the token symbol property was initialized correctly */
		assert.equal(tokenSymbol, "NOTES");
	});

	it("adds totalSupply on creation", async () => {
		let instance = await Notes.deployed();

		let totalSupply = await instance.totalSupply.call();
		assert.equal(totalSupply, 0);

		/* transaction function call, special object as last argument to specify msg.sender */
		/* create first note */
		await instance.createNote((testTitle1, testContent1),{from: owner});
		totalSupply = await instance.totalSupply.call();
		assert.equal(totalSupply, 1);

		/* create second note */
		await instance.createNote((testTitle2, testContent2),{from: owner});
		totalSupply = await instance.totalSupply.call();
		assert.equal(totalSupply, 2);
	});

	it("creates sequential token ids starting from 0", async () => {
		let instance = await Notes.deployed();

		let tokenIds = await instance.tokenIds.call();
		assert.equal(tokenIds[0], 0);
		assert.equal(tokenIds[1], 1);
	});

	it("attributes owner of created notes as caller", async () => {
		let instance = await Notes.deployed();

		let ownerBalance = await instance.balanceOf.call(owner);
		assert.equal(ownerBalance, 2);

		let ownerOfFirstNote = await instance.ownerOf.call(0);
		let ownerOfSecondNote = await instance.ownerOf.call(1);
		assert.equal(ownerOfFirstNote, owner);
		assert.equal(ownerOfSecondNote, owner);
	});

	it("emits event on note creation", async () => {
		let instance = await Notes.deployed();

		let pastEvents = await instance.getPastEvents("allEvents", { fromBlock: 1})
		assert.equal(pastEvents.length, 2);
		assert.equal(pastEvents[0].event, "Created")
		assert.equal(pastEvents[1].event, "Created")

		let firstEventReturnValue = pastEvents[0].returnValues;
		let secondEventReturnValue = pastEvents[1].returnValues;
		assert.equal(firstEventReturnValue.owner, owner);
		assert.equal(firstEventReturnValue.tokenId, 0);
		assert.equal(secondEventReturnValue.owner, owner);
		assert.equal(secondEventReturnValue.tokenId, 1);
	});
});
