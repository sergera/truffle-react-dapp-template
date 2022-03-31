export interface LogArguments {
	sev: number;
	name?: string;
	msg: string;
}

export interface SeveritiesMap {
	[key: string]: string;
};

export interface StylesMap {
	[key: string]: string[];
};
