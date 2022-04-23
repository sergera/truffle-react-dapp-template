import { hasMinLength, hasMaxLength, inLengthRange, isAlphabetic, isNumeric, 
isAlphaNumeric, isName,	isAlphaNumericName,	isLoginId, isEmail, isEther, isWei } from ".";

const alphabetic = "abcdefghijlmnopqrstuvxzABCDEFGHIJLMNOPQRSTUVXZ";
const numeric = "0123456789";
const alphaNumeric = alphabetic + numeric;
const name = "TesT NAME of SomeOne";
const alphaNumericName = "TEST Name123";
const loginName = "tes_32ti.ng4-44";
const email = "thisIsAn@emAIL.cOm.WT.xtg";

let giantAlphaString = "";
let giantNumString = "";
const tenAlphaChars = "abcdefghij";
const tenNumChars = "0123456789";
const aMillion = 1000000;
while(giantAlphaString.length < aMillion) {
	giantAlphaString += tenAlphaChars;
	giantNumString += tenNumChars;
};

test("isAlphabetic", () => {
	expect(isAlphabetic(alphabetic)).toEqual(true);
	expect(isAlphabetic("")).toEqual(false);
	expect(isAlphabetic(numeric)).toEqual(false);
	expect(isAlphabetic(alphaNumeric)).toEqual(false);
	expect(isAlphabetic(name)).toEqual(false);
	expect(isAlphabetic(alphaNumericName)).toEqual(false);
	expect(isAlphabetic(loginName)).toEqual(false);
	expect(isAlphabetic(email)).toEqual(false);

	/* performance test */
	expect(isAlphabetic(giantAlphaString)).toEqual(true);
	expect(isAlphabetic("0"+giantAlphaString)).toEqual(false);
	expect(isAlphabetic(giantAlphaString+"0")).toEqual(false);
	expect(isAlphabetic(giantNumString)).toEqual(false);
	expect(isAlphabetic("a"+giantNumString)).toEqual(false);
	expect(isAlphabetic(giantNumString+"a")).toEqual(false);
});

test("isNumeric", () => {
	expect(isNumeric(numeric)).toEqual(true);
	expect(isNumeric("")).toEqual(false);
	expect(isNumeric(alphabetic)).toEqual(false);
	expect(isNumeric(alphaNumeric)).toEqual(false);
	expect(isNumeric(name)).toEqual(false);
	expect(isNumeric(alphaNumericName)).toEqual(false);
	expect(isNumeric(loginName)).toEqual(false);
	expect(isNumeric(email)).toEqual(false);

	/* performance test */
	expect(isNumeric(giantNumString)).toEqual(true);
	expect(isNumeric("a"+giantNumString)).toEqual(false);
	expect(isNumeric(giantNumString+"a")).toEqual(false);
	expect(isNumeric(giantAlphaString)).toEqual(false);
	expect(isNumeric("0"+giantAlphaString)).toEqual(false);
	expect(isNumeric(giantAlphaString+"0")).toEqual(false);
});

test("isAlphaNumeric", () => {
	expect(isAlphaNumeric(alphaNumeric)).toEqual(true);
	expect(isAlphaNumeric(numeric)).toEqual(true);
	expect(isAlphaNumeric(alphabetic)).toEqual(true);
	expect(isAlphaNumeric("")).toEqual(false);
	expect(isAlphaNumeric(name)).toEqual(false);
	expect(isAlphaNumeric(alphaNumericName)).toEqual(false);
	expect(isAlphaNumeric(loginName)).toEqual(false);
	expect(isAlphaNumeric(email)).toEqual(false);

	/* performance test */
	expect(isAlphaNumeric(giantNumString)).toEqual(true);
	expect(isAlphaNumeric(giantAlphaString)).toEqual(true);
	expect(isAlphaNumeric(giantNumString+"_")).toEqual(false);
	expect(isAlphaNumeric("_"+giantAlphaString)).toEqual(false);
});

test("isName", () => {
	expect(isName("john")).toEqual(true);
	expect(isName(name)).toEqual(true);
	expect(isName(alphabetic)).toEqual(true);
	expect(isName("")).toEqual(false);
	expect(isName(alphaNumeric)).toEqual(false);
	expect(isName(numeric)).toEqual(false);
	expect(isName(alphaNumericName)).toEqual(false);
	expect(isName(loginName)).toEqual(false);
	expect(isName(email)).toEqual(false);

	/* edge cases */
	expect(isName(" my name")).toEqual(false);
	expect(isName("my name ")).toEqual(false);
	expect(isName(" my name ")).toEqual(false);

	/* performance test */
	expect(isName(giantAlphaString)).toEqual(true);
	expect(isName(giantAlphaString+" "+giantAlphaString)).toEqual(true);
	expect(isName(giantAlphaString+"_"+giantAlphaString)).toEqual(false);
	expect(isName("_"+giantAlphaString)).toEqual(false);
	expect(isName(giantAlphaString+"_")).toEqual(false);
	expect(isName(giantNumString)).toEqual(false);
	expect(isName(giantNumString+"a")).toEqual(false);
	expect(isName("a"+giantNumString)).toEqual(false);
});

test("isAlphaNumericName", () => {
	expect(isAlphaNumericName("john")).toEqual(true);
	expect(isAlphaNumericName(alphaNumericName)).toEqual(true);
	expect(isAlphaNumericName("my98name")).toEqual(true);
	expect(isAlphaNumericName("90myname90")).toEqual(true);
	expect(isAlphaNumericName(alphaNumeric)).toEqual(true);
	expect(isAlphaNumericName(name)).toEqual(true);
	expect(isAlphaNumericName(alphabetic)).toEqual(true);
	expect(isAlphaNumericName(numeric)).toEqual(true);
	expect(isAlphaNumericName("")).toEqual(false);
	expect(isAlphaNumericName(loginName)).toEqual(false);
	expect(isAlphaNumericName(email)).toEqual(false);

	/* edge cases */
	expect(isAlphaNumericName(" my name")).toEqual(false);
	expect(isAlphaNumericName("my name ")).toEqual(false);
	expect(isAlphaNumericName(" 98")).toEqual(false);
	expect(isAlphaNumericName("98 ")).toEqual(false);
	expect(isAlphaNumericName(" my89name ")).toEqual(false);
	expect(isAlphaNumericName(" 90myname90 ")).toEqual(false);
	expect(isAlphaNumericName("988")).toEqual(true);
	expect(isAlphaNumericName("988 89")).toEqual(true);

	/* performance test */
	expect(isAlphaNumericName(giantAlphaString)).toEqual(true);
	expect(isAlphaNumericName(giantNumString)).toEqual(true);
	expect(isAlphaNumericName(giantNumString+"a")).toEqual(true);
	expect(isAlphaNumericName("a"+giantNumString)).toEqual(true);
	expect(isAlphaNumericName(giantAlphaString+" "+giantAlphaString)).toEqual(true);
	expect(isAlphaNumericName(giantAlphaString+"_"+giantAlphaString)).toEqual(false);
	expect(isAlphaNumericName("_"+giantAlphaString)).toEqual(false);
	expect(isAlphaNumericName(giantAlphaString+"_")).toEqual(false);
});

test("isLoginId", () => {
	expect(isLoginId("john")).toEqual(true);
	expect(isLoginId(loginName)).toEqual(true);
	expect(isLoginId(alphaNumeric)).toEqual(true);
	expect(isLoginId(alphabetic)).toEqual(true);
	expect(isLoginId(numeric)).toEqual(true);
	expect(isLoginId("")).toEqual(false);
	expect(isLoginId(alphaNumericName)).toEqual(false);
	expect(isLoginId(name)).toEqual(false);
	expect(isLoginId(email)).toEqual(false);
	expect(isLoginId("my login name")).toEqual(false);

	/* edge cases */
	expect(isLoginId(".myloginname")).toEqual(false);
	expect(isLoginId("_myloginname")).toEqual(false);
	expect(isLoginId("-myloginname")).toEqual(false);
	expect(isLoginId("myloginname.")).toEqual(false);
	expect(isLoginId("myloginname_")).toEqual(false);
	expect(isLoginId("myloginname-")).toEqual(false);
	expect(isLoginId("m.y_l-o.g_i-n.n_a-m.e")).toEqual(true);

	/* performance test */
	expect(isLoginId(giantAlphaString)).toEqual(true);
	expect(isLoginId(giantNumString)).toEqual(true);
	expect(isLoginId(giantNumString+"a")).toEqual(true);
	expect(isLoginId("a"+giantNumString)).toEqual(true);
	expect(isLoginId(giantAlphaString+"_"+giantAlphaString)).toEqual(true);
	expect(isLoginId(giantAlphaString+" "+giantAlphaString)).toEqual(false);
	expect(isLoginId("_"+giantAlphaString)).toEqual(false);
	expect(isLoginId(giantAlphaString+"_")).toEqual(false);
});

test("isEmail", () => {
	expect(isEmail("john@something.com")).toEqual(true);
	expect(isEmail(email)).toEqual(true);
	expect(isEmail("")).toEqual(false);
	expect(isEmail(loginName)).toEqual(false);
	expect(isEmail(alphaNumeric)).toEqual(false);
	expect(isEmail(alphabetic)).toEqual(false);
	expect(isEmail(alphaNumericName)).toEqual(false);
	expect(isEmail(name)).toEqual(false);
	expect(isEmail(numeric)).toEqual(false);
	
	/* edge cases */
	expect(isEmail(".myemail@gmail.com")).toEqual(false);
	expect(isEmail("_myemail@gmail.com")).toEqual(false);
	expect(isEmail("-myemail@gmail.com")).toEqual(false);
	expect(isEmail("myemail.@gmail.com")).toEqual(false);
	expect(isEmail("myemail_@gmail.com")).toEqual(false);
	expect(isEmail("myemail-@gmail.com")).toEqual(false);
	expect(isEmail("m.y_e-m.a_i-l@gmail.com")).toEqual(true);

	/* performance test */
	const emailId = "myemailid";
	const domainName = "domainName";
	const domainExtension = "com";

	expect(isEmail(giantAlphaString+"@"+domainName+"."+domainExtension)).toEqual(true);
	expect(isEmail(emailId+"@"+giantAlphaString+"."+domainExtension)).toEqual(true);
	expect(isEmail(emailId+"@"+domainName+"."+giantAlphaString)).toEqual(true);
	expect(isEmail(emailId+"@"+domainName+"."+domainExtension+"."+giantAlphaString)).toEqual(true);
	expect(isEmail(giantAlphaString+"@"+domainName+"._"+domainExtension)).toEqual(false);
	expect(isEmail(emailId+"@"+giantAlphaString+".0"+domainExtension)).toEqual(false);
	expect(isEmail(emailId+"@"+domainName+"."+giantAlphaString+".")).toEqual(false);
	expect(isEmail(emailId+"@"+domainName+"."+domainExtension+"."+giantAlphaString+"0")).toEqual(false);
});

test("hasMinLength", () => {
	const tenChars = "0123456789";
	expect(hasMinLength(tenChars, 0)).toEqual(true);
	expect(hasMinLength(tenChars, 9)).toEqual(true);
	expect(hasMinLength(tenChars, 10)).toEqual(true);
	expect(hasMinLength(tenChars, 11)).toEqual(false);

	const zeroChars = "";
	expect(hasMinLength(zeroChars, 0)).toEqual(true);
	expect(hasMinLength(zeroChars, 1)).toEqual(false);

	/* edge cases */
	expect(hasMinLength(zeroChars, -1)).toEqual(true);
	expect(hasMinLength(zeroChars, -10)).toEqual(true);
	expect(hasMinLength(tenChars, -1)).toEqual(true);
	expect(hasMinLength(tenChars, -10)).toEqual(true);
});

test("hasMaxLength", () => {
	const tenChars = "0123456789";
	expect(hasMaxLength(tenChars, 10)).toEqual(true);
	expect(hasMaxLength(tenChars, 11)).toEqual(true);
	expect(hasMaxLength(tenChars, 9)).toEqual(false);
	expect(hasMaxLength(tenChars, 0)).toEqual(false);

	const zeroChars = "";
	expect(hasMaxLength(zeroChars, 1)).toEqual(true);
	expect(hasMaxLength(zeroChars, 0)).toEqual(true);

	/* edge cases */
	expect(hasMaxLength(zeroChars, -1)).toEqual(false);
	expect(hasMaxLength(zeroChars, -10)).toEqual(false);
	expect(hasMaxLength(tenChars, -1)).toEqual(false);
	expect(hasMaxLength(tenChars, -10)).toEqual(false);
});

test("inLengthRange", () => {
	const tenChars = "0123456789";
	expect(inLengthRange(tenChars, 10, 10)).toEqual(true);
	expect(inLengthRange(tenChars, 9, 11)).toEqual(true);
	expect(inLengthRange(tenChars, 0, 10)).toEqual(true);
	expect(inLengthRange(tenChars, 11, 9)).toEqual(false);
	expect(inLengthRange(tenChars, 0, 9)).toEqual(false);
	expect(inLengthRange(tenChars, 4, 5)).toEqual(false);

	const zeroChars = "";
	expect(inLengthRange(zeroChars, 0, 0)).toEqual(true);
	expect(inLengthRange(zeroChars, 0, 1)).toEqual(true);
	expect(inLengthRange(zeroChars, 1, 0)).toEqual(false);
});

test("isEther", () => {
	const eighteenNonZeroNumbers = "123456789112345678";
	const seventyEightNonZeroNumbers = "123456789112345678911234567891123456789112345678911234567891123456789112345678";

	expect(isEther("0")).toEqual(true);
	expect(isEther("0.0")).toEqual(true);
	expect(isEther("0,0")).toEqual(true);
	expect(isEther(seventyEightNonZeroNumbers)).toEqual(true);
	expect(isEther("0."+eighteenNonZeroNumbers)).toEqual(true);
	expect(isEther("0,"+eighteenNonZeroNumbers)).toEqual(true);
	expect(isEther(seventyEightNonZeroNumbers+"."+eighteenNonZeroNumbers)).toEqual(true);
	expect(isEther(seventyEightNonZeroNumbers+","+eighteenNonZeroNumbers)).toEqual(true);

	/* wrong format */
	expect(isEther("0.")).toEqual(false);
	expect(isEther("0,")).toEqual(false);
	expect(isEther(seventyEightNonZeroNumbers+".")).toEqual(false);
	expect(isEther(seventyEightNonZeroNumbers+",")).toEqual(false);

	/* extra digits */
	expect(isEther(seventyEightNonZeroNumbers+"1")).toEqual(false);
	expect(isEther("0."+eighteenNonZeroNumbers+"1")).toEqual(false);
	expect(isEther("0,"+eighteenNonZeroNumbers+"1")).toEqual(false);

	/* leading and trailing zeros */
	expect(isEther("01")).toEqual(false);
	expect(isEther("01.1")).toEqual(false);
	expect(isEther("01,1")).toEqual(false);
	expect(isEther("01.10")).toEqual(false);
	expect(isEther("01,10")).toEqual(false);
	expect(isEther("0.10")).toEqual(false);
	expect(isEther("0,10")).toEqual(false);
	expect(isEther("1.10")).toEqual(false);
	expect(isEther("1,10")).toEqual(false);
});

test("isWei", () => {
	const seventyEightNonZeroNumbers = "123456789112345678911234567891123456789112345678911234567891123456789112345678"

	expect(isWei("0")).toEqual(true);
	expect(isWei("1")).toEqual(true);
	expect(isWei(seventyEightNonZeroNumbers)).toEqual(true);
	
	/* wrong format */
	expect(isWei("0.0")).toEqual(false);
	expect(isWei("0,0")).toEqual(false);
	expect(isWei("1.0")).toEqual(false);
	expect(isWei("1,0")).toEqual(false);
	expect(isWei(seventyEightNonZeroNumbers+".")).toEqual(false);
	expect(isWei(seventyEightNonZeroNumbers+",")).toEqual(false);

	/* extra digits */
	expect(isWei(seventyEightNonZeroNumbers+"1")).toEqual(false);
	expect(isWei("1"+seventyEightNonZeroNumbers)).toEqual(false);
	
	/* leading zeros */
	expect(isWei("01")).toEqual(false);
});
