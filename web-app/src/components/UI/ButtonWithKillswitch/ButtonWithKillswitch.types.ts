export interface ButtonWithKillswitchProps {
	killswitch: boolean;
	isConnected: boolean;
	isChainPermitted: boolean;
	pleaseConnect: Function;
	selectChain: Function;
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
	id?: string;
	styleClass?: string;
};
