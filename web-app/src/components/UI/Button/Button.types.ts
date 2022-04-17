export interface ButtonProps {
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
	styleClass?: string;
};
