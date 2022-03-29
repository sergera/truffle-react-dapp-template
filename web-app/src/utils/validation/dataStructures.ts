export function isString(str: any) {
	return typeof str === typeof "";
};

export function isObject(obj: any) {
	return obj.constructor.toString().indexOf("Object") > -1;
};
