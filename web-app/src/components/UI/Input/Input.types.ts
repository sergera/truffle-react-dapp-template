export interface InputProps {
	callback: Function;
	value: string;
	name: string;
	isValid: boolean;
	rules: string[];
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
