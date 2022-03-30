// interface for a dynamic object
export interface LooseObject {
	[key: string]: any;
};

// interface for MetaMask errors
export interface ProviderRpcError extends Error {
	message: string;
	code: number;
	data?: unknown;
};

export type AbstractClass<T> = Function & {prototype: T};

export type ConstructorClass<T> = new (...args: any[]) => T;
