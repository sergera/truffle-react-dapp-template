import { LooseObject } from "../../../types";

export interface RadioInputOption {
	label: string;
	data?: LooseObject;
};

export interface RadioInputProps {
	label: string;
	options: RadioInputOption[];
	value: RadioInputOption;
	handleChange: Function;
	isRequired?: boolean;
	formId?: string;
	styleClass?: string;
};
