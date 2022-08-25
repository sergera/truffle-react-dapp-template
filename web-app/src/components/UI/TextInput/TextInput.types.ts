export interface TextInputProps {
	handleChange: Function;
	value: string;
	name: string;
	handleFocus?: Function;
	handleBlur?: Function;
	isValid?: boolean;
	isRequired?: boolean;
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
