// interface for a dynamic object
export interface LooseObject {
	[key: string]: any;
};

export interface JsonObject {
	[key: string]: JsonValue;
};

export type JsonValue =
		| JsonObject
    | string
    | number
    | boolean
    | JsonArray;

export interface JsonArray extends Array<JsonValue> {};

export type AbstractClass<T> = Function & {prototype: T};

export type ConstructorClass<T> = new (...args: any[]) => T;

export type ReactFunctionalComponent = (props: any) => JSX.Element;
