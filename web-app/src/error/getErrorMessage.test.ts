import { getErrorMessage } from './getErrorMessage';

class TestError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "TestError";
	}
};

test("should return error message if arg is instance of Error", () => {
	const errorMessage = "test error message";
	const testError = new TestError(errorMessage);
	expect(getErrorMessage(testError)).toEqual(errorMessage);
});

test("should return JSON string if arg is obj", () => {
	const obj = {a:1,b:2};
	expect(getErrorMessage(obj)).toEqual(JSON.stringify(obj));
});

test("should return string of arg if arg is not instance of Error nor object", () => {
	const array = [1,2,3];
	const str = "test";
	const func = () => {};
	expect(getErrorMessage(array)).toEqual(String(array));
	expect(getErrorMessage(str)).toEqual(String(str));
	expect(getErrorMessage(func)).toEqual(String(func));
});
