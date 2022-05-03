import { LooseObject } from "../../../types";

export interface SelectOption {
	label: string;
	data?: LooseObject;
};

export interface SelectProps {
	label: string;
	options: SelectOption[];
	handleChange: Function;
	handleBlur?: Function;
	isRequired?: boolean;
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
