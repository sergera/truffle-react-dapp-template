import { ReactFunctionalComponent } from "../../types";

export interface ModalContainerProps {
	type: string;
	close: Function;
};

export interface ModalComponentsMap {
	[key: string]: ReactFunctionalComponent;
};
