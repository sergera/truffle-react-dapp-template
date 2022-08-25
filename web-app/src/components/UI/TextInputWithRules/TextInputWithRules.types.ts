export interface TextInputWithRulesProps {
	handleChange: Function;
	value: string;
	name: string;
	isValid: boolean;
	rules: string[];
	handleFocus?: Function;
	handleBlur?: Function;
	isRequired?: boolean;
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
