export interface ButtonWithKillswitchProps {
	killswitch: boolean;
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
	styleClass?: string;
};
