import { LooseObject } from "../../../types";

export interface SelectOption {
	label: string;
	data?: LooseObject;
};

export interface SelectProps {
	label: string;
	selected: SelectOption;
	options: SelectOption[];
	handleChange: Function;
	handleBlur?: Function;
	isRequired?: boolean;
	formId?: string;
	styleClass?: string;
};
