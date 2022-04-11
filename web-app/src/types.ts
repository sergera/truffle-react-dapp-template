// interface for a dynamic object
export interface LooseObject {
	[key: string]: any;
};

export type AbstractClass<T> = Function & {prototype: T};

export type ConstructorClass<T> = new (...args: any[]) => T;

export type ReactFunctionalComponent = (props: any) => JSX.Element;
