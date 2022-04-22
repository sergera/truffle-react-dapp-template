export interface ButtonProps {
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
	shouldFocusOnRender?: boolean;
	styleClass?: string;
};
