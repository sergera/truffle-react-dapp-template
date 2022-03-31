import { isString, isObject } from ".";

describe("isString", () => {
	test("should return true if arg is a string", () => {
		let emptyStr = "";
		let filledStr = "test";
		expect(isString(emptyStr)).toEqual(true);
		expect(isString(filledStr)).toEqual(true);
	});

	test("should return false if arg is an object", () => {
		let obj = {};
		expect(isString(obj)).toEqual(false);
	});
	
	test("should return false if arg is an array", () => {
		let array: Array<any> = [];
		expect(isString(array)).toEqual(false);
	});
	
	test("should return false if arg is a function", () => {
		let funcExpression = function(){};
		let arrowFuncExpression = () => {};
		function funcDeclaration(){};
		expect(isString(funcExpression)).toEqual(false);
		expect(isString(arrowFuncExpression)).toEqual(false);
		expect(isString(funcDeclaration)).toEqual(false);
	});
	
	test("should return false if arg is a number", () => {
		let zero = 0;
		let two = 2;
		expect(isString(zero)).toEqual(false);
		expect(isString(two)).toEqual(false);
	});
	
	test("should return false if arg is a boolean", () => {
		let trueBool = true;
		let falseBool = false;
		expect(isString(trueBool)).toEqual(false);
		expect(isString(falseBool)).toEqual(false);
	});
});

describe("isObject", () => {
	test("should return true if arg is an object", () => {
		let obj = {};
		expect(isObject(obj)).toEqual(true);
	});
	
	test("should return false if arg is an array", () => {
		let array: Array<any> = [];
		expect(isObject(array)).toEqual(false);
	});
	
	test("should return false if arg is a function", () => {
		let funcExpression = function(){};
		let arrowFuncExpression = () => {};
		function funcDeclaration(){};
		expect(isObject(funcExpression)).toEqual(false);
		expect(isObject(arrowFuncExpression)).toEqual(false);
		expect(isObject(funcDeclaration)).toEqual(false);
	});
	
	test("should return false if arg is a number", () => {
		let zero = 0;
		let two = 2;
		expect(isObject(zero)).toEqual(false);
		expect(isObject(two)).toEqual(false);
	});
	
	test("should return false if arg is a string", () => {
		let emptyStr = "";
		let filledStr = "test";
		expect(isObject(emptyStr)).toEqual(false);
		expect(isObject(filledStr)).toEqual(false);
	});
	
	test("should return false if arg is a boolean", () => {
		let trueBool = true;
		let falseBool = false;
		expect(isObject(trueBool)).toEqual(false);
		expect(isObject(falseBool)).toEqual(false);
	});
});
