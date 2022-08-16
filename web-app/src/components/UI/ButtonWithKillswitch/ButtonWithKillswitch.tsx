import { connect } from 'react-redux';

import { Button } from '../Button/Button';

import { openModal } from '../../../state/modal'

import { MODAL_TYPES } from '../../../constants';

import { RootState, Dispatch } from '../../../state';
import { ButtonWithKillswitchProps } from './ButtonWithKillswitch.types';

export function ButtonWithKillswitch({
	killswitch,
	isConnected,
	isChainPermitted,
	pleaseConnect,
	selectChain,
	handleClick,
	name,
	id="",
	styleClass="",
}: ButtonWithKillswitchProps) {

	if(killswitch) {
		if(isConnected && !isChainPermitted) {
			return (
				<Button 
					handleClick={() => selectChain()}
					name={name}
					id={id}
					styleClass={styleClass}
				/>
			);
		}
		return (
			<Button 
				handleClick={() => pleaseConnect()}
				name={name}
				id={id}
				styleClass={styleClass}
			/>
		);			
	} else {
		return (
			<Button 
				handleClick={handleClick}
				name={name}
				id={id}
				styleClass={styleClass}
			/>	
		);
	}
};

const mapStateToProps = (state: RootState) => {
	return {
		killswitch: state.connection.killswitch,
		isConnected: state.chain.isConnected,
		isChainPermitted: state.chain.isPermitted,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		pleaseConnect: () => dispatch(openModal(MODAL_TYPES.pleaseConnect)),
		selectChain: () => dispatch(openModal(MODAL_TYPES.selectChain)),
  };
};

export const ConnectedButtonWithKillswitch = connect(
	mapStateToProps,
	mapDispatchToProps
)(ButtonWithKillswitch);
