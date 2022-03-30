import { getContracts, deleteContracts, setContracts } from './contracts';
import { getContractNames } from '../env';

import web3 from './web3';

/* mock web3 contract constructor dependency */
jest.mock("./web3", () => ({eth: {Contract: jest.fn()}}));
let mockContractConstructor = web3.eth.Contract as jest.Mock;

/* mock env variable getter dependency */
jest.mock("../env", () => ({
	__esModule: true,
	getContractNames: jest.fn(),
}));

let mockGetContractNames = getContractNames as jest.Mock;

/* declare fake contract values */
const testContractOneName = "testContractOne";
const testContractTwoName = "testContractTwo";
const testChainIdOne = "1234";
const testChainIdTwo = "4321"
const testContractOneChainOneAddress = "0x1234";
const testContractTwoChainOneAddress = "0x2345";
const testContractOneChainTwoAddress = "0x4321";
const testContractTwoChainTwoAddress = "0x5432";
const testAbiOne = { [testContractOneName]: "abi one" };
const testAbiTwo = { [testContractTwoName]: "abi two" };

/* mock contract files */
jest.mock("../../../build/contracts/testContractOne.json", () => ({
	name: testContractOneName,
	networks: {
		[testChainIdOne]: {address: testContractOneChainOneAddress},
		[testChainIdTwo]: {address: testContractOneChainTwoAddress}
	},
	abi: testAbiOne
}), { virtual: true });

jest.mock("../../../build/contracts/testContractTwo.json", () => ({
	name: testContractTwoName,
	networks: {
		[testChainIdOne]: {address: testContractTwoChainOneAddress},
		[testChainIdTwo]: {address: testContractTwoChainTwoAddress}
	},
	abi: testAbiTwo
}), { virtual: true });

describe("setContracts", () => {
	afterEach(() => {
		deleteContracts();
	});

	test("should set contracts in exported contracts object", async () => {
		mockGetContractNames.mockImplementation(() => ([testContractOneName,testContractTwoName]));
		mockContractConstructor.mockImplementation((ABI, address) => ({address: address}));

		await setContracts(testChainIdOne);
		const contractsAfter = getContracts();
		expect(contractsAfter).toHaveProperty(testContractOneName);
		expect(contractsAfter).toHaveProperty(testContractTwoName);
		expect(contractsAfter[testContractOneName].address).toEqual(testContractOneChainOneAddress);
		expect(contractsAfter[testContractTwoName].address).toEqual(testContractTwoChainOneAddress);
	});

	test("should replace contracts according to chain", async () => {
		mockGetContractNames.mockImplementation(() => ([testContractOneName,testContractTwoName]));
		mockContractConstructor.mockImplementation((ABI, address) => ({address: address}));

		await setContracts(testChainIdOne);
		const contractsBefore = getContracts();
		expect(contractsBefore).toHaveProperty(testContractOneName);
		expect(contractsBefore).toHaveProperty(testContractTwoName);
		expect(contractsBefore[testContractOneName].address).toEqual(testContractOneChainOneAddress);
		expect(contractsBefore[testContractTwoName].address).toEqual(testContractTwoChainOneAddress);

		await setContracts(testChainIdTwo);
		const contractsAfter = getContracts();
		expect(contractsAfter).toHaveProperty(testContractOneName);
		expect(contractsAfter).toHaveProperty(testContractTwoName);
		expect(contractsAfter[testContractOneName].address).toEqual(testContractOneChainTwoAddress);
		expect(contractsAfter[testContractTwoName].address).toEqual(testContractTwoChainTwoAddress);
	});

	test("should keep contracts object empty if any contract doesn't exist", async () => {
		mockGetContractNames.mockImplementation(() => (["notTestContractOneName","notTestContractTwoName"]));
		mockContractConstructor.mockImplementation((ABI, address) => ({address: address}));

		await setContracts(testChainIdOne);
		const contractsAfter = getContracts();
		expect(contractsAfter).toEqual({});
	});

	test("should keep contracts object empty if any contract doesn't exist on this chain", async () => {
		mockGetContractNames.mockImplementation(() => ([testContractOneName,testContractTwoName]));
		mockContractConstructor.mockImplementation((ABI, address) => ({address: address}));

		await setContracts("notTestChainIdOne");
		const contractsAfter = getContracts();
		expect(contractsAfter).toEqual({});
	});

	test("should keep contracts object empty if any contract has the incorrect ABI", async () => {
		mockGetContractNames.mockImplementation(() => ([testContractOneName,testContractTwoName]));
		mockContractConstructor
		.mockImplementationOnce((ABI, address) => ({address: address}))
		.mockImplementationOnce((ABI, address) => { throw new Error("") });

		await setContracts(testChainIdOne);
		const contractsAfter = getContracts();
		expect(contractsAfter).toEqual({});
	});
});

describe("deleteContracts", () => {
	test("should set exported contracts object to empty", async () => {
		mockGetContractNames.mockImplementation(() => ([testContractOneName,testContractTwoName]));
		mockContractConstructor.mockImplementation((ABI, address) => ({address: address}));

		await setContracts(testChainIdOne);
		const contractsBefore = getContracts();
		expect(contractsBefore).toHaveProperty(testContractOneName);
		expect(contractsBefore).toHaveProperty(testContractTwoName);
		expect(contractsBefore[testContractOneName].address).toEqual(testContractOneChainOneAddress);
		expect(contractsBefore[testContractTwoName].address).toEqual(testContractTwoChainOneAddress);

		deleteContracts();
		const contractsAfter = getContracts();
		expect(contractsAfter).toEqual({});
	});
});
