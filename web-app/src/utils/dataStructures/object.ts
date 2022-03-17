export function isObject(obj: any) {
	return obj.constructor.toString().indexOf("Object") > -1;
};
