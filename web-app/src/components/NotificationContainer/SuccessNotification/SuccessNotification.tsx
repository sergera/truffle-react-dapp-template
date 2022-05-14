import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { closeSuccessNotification } from '../../../state/notification';

import { KEYS } from '../../../constants';

import { Dispatch } from '../../../state';
import { SuccessNotificationProps } from './SuccessNotification.types';

import { focusLastElement } from '../../../scripts/lastFocusedElement';

export const SuccessNotification = ({
	message, 
	close, 
	shouldChangeFocusOnClose
}: SuccessNotificationProps) => {

	useEffect(() => {
    function keyListener(e: React.KeyboardEvent) {
      if (e.key === KEYS.escape) {
        close();
      }
    };

		document.addEventListener<any>("keydown", keyListener);

		return function cleanUp() {
			document.removeEventListener<any>("keydown", keyListener);
		}
	}, [close]);

	let closeAndFocusLastElement = () => {
		close();
		shouldChangeFocusOnClose && focusLastElement();
	};

 	return (
		<div 
			id="success-notification"
			className="notification success-notification"
		>
			<p className="notification__title">{"Success"}</p>
			<p className="notification__message">{message}</p>
			<Button 
				styleClass="btn-success-notification" 
				name={"Close"} 
				handleClick={closeAndFocusLastElement}
				shouldFocusOnRender={true}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeSuccessNotification()),
  };
};

export const ConnectedSuccessNotification = connect(
	null,
	mapDispatchToProps,
)(SuccessNotification);
