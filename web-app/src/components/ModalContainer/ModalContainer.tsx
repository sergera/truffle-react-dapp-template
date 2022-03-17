import { connect } from 'react-redux';

import ModalNotInstalled from './metamask/ModalNotInstalled/ModalNotInstalled';
import ModalNotConnected from './metamask/ModalNotConnected/ModalNotConnected';
import ModalDisconnected from './metamask/ModalDisconnected/ModalDisconnected';
import ModalMultipleProviders from './metamask/ModalMultipleProviders/ModalMultipleProviders';
import ModalSelectChain from './metamask/ModalSelectChain/ModalSelectChain';

import { closeModal } from '../../state/modal/modalSlice';

import { RootState, Dispatch } from '../../state/store';
import { ModalContainerProps, ModalComponentsMap } from './types';
import { isTemplateMiddleOrTemplateTail } from 'typescript';

export const MODAL_COMPONENTS: ModalComponentsMap = {
	"NOT_INSTALLED": ModalNotInstalled,
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

export default connect(mapStateToProps,mapDispatchToProps)(ModalContainer);
