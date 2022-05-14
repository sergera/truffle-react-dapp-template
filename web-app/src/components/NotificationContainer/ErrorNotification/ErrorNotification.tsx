import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { closeErrorNotification } from '../../../state/notification';

import { KEYS } from '../../../constants';

import { Dispatch } from '../../../state';
import { ErrorNotificationProps } from './ErrorNotification.types';

import { focusLastElement } from '../../../scripts/lastFocusedElement';

export const ErrorNotification = ({
	message, 
	close, 
	shouldChangeFocusOnClose
}: ErrorNotificationProps) => {

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
			id="error-notification"
			className="notification error-notification"
		>
			<p className="notification__title">{"Error"}</p>
			<p className="notification__message">{message}</p>
			<Button 
				styleClass="btn-error-notification" 
				name={"Close"} 
				handleClick={closeAndFocusLastElement}
				shouldFocusOnRender={true}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeErrorNotification()),
  };
};

export const ConnectedErrorNotification = connect(
	null,
	mapDispatchToProps,
)(ErrorNotification);
