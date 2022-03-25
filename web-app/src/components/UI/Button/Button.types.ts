export interface ButtonProps {
	callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
	styleClass?: string;
};
