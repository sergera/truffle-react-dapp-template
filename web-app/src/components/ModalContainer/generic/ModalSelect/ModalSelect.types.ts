export interface ModalSelectListArrayItem {
	name: string;
	callback: Function;
};

export interface ModalSelectProps {
	close: Function;
	title?: string;
	content: string;
	list: Array<ModalSelectListArrayItem>;
};
