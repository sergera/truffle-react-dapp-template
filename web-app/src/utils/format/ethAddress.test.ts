import { minify, toCheckSum } from './ethAddress';

describe("minify", () => {
	describe("returns first 6 chars + ... + last 4 chars", () => {
		test("returns all chars if length is 10", () => {
			const tenChars = "123456789a";
			expect(minify(tenChars)).toEqual("123456...789a");
		});

		test("returns repeated chars if length is 6", () => {
			const sixChars = "123456";
			expect(minify(sixChars)).toEqual("123456...3456");
		});

		test("returns less than 6 chars in beggining (and all repeated) if length is 4", () => {
			const fourChars = "1234";
			expect(minify(fourChars)).toEqual("1234...1234")
		});
	});
});

describe("toCheckSum", () => {
	test("incorrect format returns correct", () => {
		const incorrect = "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359";
		const correct = "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359";
		expect(toCheckSum(incorrect)).toEqual(correct);
	});

	test("correct format returns unchanged", () => {
		const correct1 = "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed";
		const correct2 = "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359";
		const correct3 = "0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB";
		const correct4 = "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb";
		expect(toCheckSum(correct1)).toEqual(correct1);
		expect(toCheckSum(correct2)).toEqual(correct2);
		expect(toCheckSum(correct3)).toEqual(correct3);
		expect(toCheckSum(correct4)).toEqual(correct4);
	});
});
