import { connect } from 'react-redux';

import { Button } from '../Button/Button';

import { openModal } from '../../../state/modal'

import { MODAL_TYPES } from '../../../state/modal';

import { RootState, Dispatch } from '../../../state';
import { ButtonWithKillswitchProps } from './ButtonWithKillswitch.types';

export function ButtonWithKillswitch({
	killswitch,
	pleaseConnect,
	handleClick, 
	name, 
	styleClass=""
}: ButtonWithKillswitchProps) {

	if(killswitch) {
		return (
			<Button 
				handleClick={() => pleaseConnect()}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
    pleaseConnect: () => dispatch(openModal(MODAL_TYPES.pleaseConnect)),
  };
};

export const ConnectedButtonWithKillswitch = connect(
	mapStateToProps,
	mapDispatchToProps
)(ButtonWithKillswitch);
