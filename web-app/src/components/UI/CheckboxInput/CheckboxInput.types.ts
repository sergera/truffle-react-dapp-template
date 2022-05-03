import { LooseObject } from "../../../types";

export interface CheckboxInputOption {
	label: string;
	data?: LooseObject;
};

export interface CheckboxInputProps {
	label: string;
	options: CheckboxInputOption[];
	handleChange: Function;
	isRequired?: boolean;
	formId?: string;
	styleClass?: string;
};
