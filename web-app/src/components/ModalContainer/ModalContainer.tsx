import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../state/modal';

import { MODAL_COMPONENTS } from './ModalContainer.constants';
import { MODAL_TYPES } from '../../constants';

import { RootState, Dispatch } from '../../state';
import { ModalContainerProps } from './ModalContainer.types';

import { KEYS } from '../../constants';

import { focusLastElement } from '../../scripts/lastFocusedElement';
import { scrollIntoView } from '../../scripts/scrollFocusIntoView';

export function ModalContainer({
	type, 
	close,
}:ModalContainerProps) {
 
	useEffect(() => {
    function keyListener(e: React.KeyboardEvent) {
      if (e.key === KEYS.escape) {
        close();
      }
    }

		document.addEventListener<any>("keydown", keyListener);

		return function cleanUp() {
			document.removeEventListener<any>("keydown", keyListener);
		}
	}, [close]);

	let actionAfterCloseDecorator = (action: Function) => {
		return () => {
			close();
			action();
		};
	};

	let chooseAfterCloseFocus = (modalType: string) => {
		if(modalType === MODAL_TYPES.pleaseConnect) {
			return () => {
				let connectButton = document.getElementById("connect-to-blockchain");
				if(connectButton) {
					connectButton.focus();
					scrollIntoView(connectButton);
				}
			};
		}

		return focusLastElement;
	};

	const modalExists = type in MODAL_COMPONENTS;
	const SpecificModal = MODAL_COMPONENTS[type];

	if(modalExists) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "scroll";
	}

	return (
		<> 
		{modalExists &&
			<div 
				id="modal-container"
				className="modal-container"
			>
				<SpecificModal close={actionAfterCloseDecorator(chooseAfterCloseFocus(type))} />
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
