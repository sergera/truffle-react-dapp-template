export interface TextInputWithRulesProps {
	handleChange: Function;
	value: string;
	name: string;
	isValid: boolean;
	rules: string[];
	isRequired?: boolean;
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
