import { connect } from 'react-redux';

import { Button } from '../Button/Button';

import { RootState } from '../../../state';
import { ButtonWithKillswitchProps } from './ButtonWithKillswitch.types';

export function ButtonWithKillswitch({
	killswitch,
	handleClick, 
	name, 
	styleClass=""
}: ButtonWithKillswitchProps) {

	if(killswitch) {
		return (
			<Button 
				handleClick={()=>{}}
				name={name}
				styleClass={styleClass}
			/>
		);
	} else {
		return (
			<Button 
				handleClick={handleClick} 
				name={name} 
				styleClass={styleClass} 
			/>	
		);
	}
};

const mapStateToProps = (state: RootState) => {
	return {
		killswitch: state.connection.killswitch,
	};
};

export const ConnectedButtonWithKillswitch = connect(
	mapStateToProps
)(ButtonWithKillswitch);
