export interface InputProps {
	callback: Function;
	value: string;
	name: string;
	valid: boolean;
	rules: string[];
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
