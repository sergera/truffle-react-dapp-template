export interface TextInputProps {
	handleChange: Function;
	value: string;
	name: string;
	handleBlur?: Function;
	isValid?: boolean;
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
