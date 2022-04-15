import { connect } from 'react-redux';

import { closeModal } from '../../state/modal';

import { MODAL_COMPONENTS } from './ModalContainer.constants';

import { RootState, Dispatch } from '../../state';
import { ModalContainerProps } from './ModalContainer.types';

export function ModalContainer({
	type, 
	close,
}:ModalContainerProps) {
	const modalExists = type in MODAL_COMPONENTS;
	const SpecificModal = MODAL_COMPONENTS[type];
	return (
		<> 
		{modalExists &&
			<div 
				id="modal-container"
				className="modal-container"
			>
				<SpecificModal close={close} />
			</div>
		}
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		type: state.modal.type,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeModal()),
  };
};

export const ConnectedModalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalContainer);
