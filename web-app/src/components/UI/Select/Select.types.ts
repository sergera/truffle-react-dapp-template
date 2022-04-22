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
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};
