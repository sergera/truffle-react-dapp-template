export interface ButtonWithKillswitchProps {
	killswitch: boolean;
	pleaseConnect: Function,
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
	id?: string;
	styleClass?: string;
};
