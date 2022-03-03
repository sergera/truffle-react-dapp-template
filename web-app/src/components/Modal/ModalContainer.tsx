import { connect } from 'react-redux';

import ModalNotInstalled from './metamask/ModalNotInstalled/ModalNotInstalled';
import ModalNotConnected from './metamask/ModalNotConnected/ModalNotConnected';
import ModalDisconnected from './metamask/ModalDisconnected/ModalDisconnected';
import ModalMultipleProviders from './metamask/ModalMultipleProviders/ModalMultipleProviders';
import ModalSelectChain from './metamask/ModalSelectChain/ModalSelectChain';

import { RootState, Dispatch } from '../../state/store';
import { closeModal } from '../../state/modal/modalSlice';

interface ModalContainerProps {
	open: boolean,
	type: string,
	close: Function,
	providerOk: boolean,
	chainOk: boolean,
	children?: JSX.Element,
};

interface ModalComponentsMap {
	[key: string]: (props: any) => JSX.Element;
};

const MODAL_COMPONENTS: ModalComponentsMap = {
	"NOT_INSTALLED": ModalNotInstalled,
	"NOT_CONNECTED": ModalNotConnected,
	"DISCONNECTED": ModalDisconnected,
	"MULTIPLE_PROVIDERS": ModalMultipleProviders,
	"SELECT_CHAIN": ModalSelectChain
};

function ModalContainer({
	open, 
	type, 
	close,
	providerOk, 
	chainOk, 
	children
}:ModalContainerProps) {
	if(type === "PORTAL") {
		// portal driven modals can be sent for whatever reason
		// if type portal, render whatever comes through
		return (
			<div 
				id="modal-container"
				className="modal-container"
				style={{display: open ? "block" : "none" }}
			>
				{children}
			</div>
		);
	} else if(type in MODAL_COMPONENTS) {
		// redux state driven modals are related to metamask provider and chain problems
		// if this is case only render if there is something wrong
		const everythingOk = providerOk && chainOk;
		const SpecificModal = MODAL_COMPONENTS[type];
		return (
			<div 
				className="modal-container"
				style={{display: open && !everythingOk ? "block" : "none" }}
			>
				<SpecificModal close={close} />
			</div>
		);
	}
	// make typescript not complain that this component returns nothing
	// change please
	return <></>;
};

const mapStateToProps = (state: RootState) => {
	return {
		open: state.modal.open,
		type: state.modal.type,
		providerOk: state.provider.statusOk,
		chainOk: state.chain.isPermitted,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ModalContainer);
