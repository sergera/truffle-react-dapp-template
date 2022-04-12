import { connect } from 'react-redux';

import { ModalDisabled } from './metamask/ModalDisabled';
import { ModalNotConnected } from './metamask/ModalNotConnected';
import { ModalDisconnected } from './metamask/ModalDisconnected';
import { ModalMultipleProviders } from './metamask/ModalMultipleProviders';
import { ModalSelectChain } from './metamask/ModalSelectChain';

import { closeModal } from '../../state/modal';

import { RootState, Dispatch } from '../../state';
import { ModalContainerProps, ModalComponentsMap } from './ModalContainer.types';

export const MODAL_COMPONENTS: ModalComponentsMap = {
	"DISABLED": ModalDisabled,
	"NOT_CONNECTED": ModalNotConnected,
	"DISCONNECTED": ModalDisconnected,
	"MULTIPLE_PROVIDERS": ModalMultipleProviders,
	"SELECT_CHAIN": ModalSelectChain
};

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

export const ConnectedModalContainer = connect(mapStateToProps,mapDispatchToProps)(ModalContainer);
