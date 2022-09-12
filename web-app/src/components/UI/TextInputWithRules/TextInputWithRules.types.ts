export interface TextInputWithRulesProps {
	handleChange: Function;
	value: string;
	isValid: boolean;
	rules: string[];
	name?: string;
	handleFocus?: Function;
	handleBlur?: Function;
	isRequired?: boolean;
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
