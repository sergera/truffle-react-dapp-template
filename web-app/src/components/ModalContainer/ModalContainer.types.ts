export interface ModalContainerProps {
	type: string;
	close: Function;
};

export interface ModalComponentsMap {
	[key: string]: (props: any) => JSX.Element;
};
