import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { closeWarningNotification } from '../../../state/notification';

import { KEYS } from '../../../constants';

import { Dispatch } from '../../../state';
import { WarningNotificationProps } from './WarningNotification.types';

import { focusLastElement } from '../../../scripts/lastFocusedElement';

export const WarningNotification = ({
	message, 
	close, 
	shouldChangeFocusOnClose
}: WarningNotificationProps) => {

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
			id="warning-notification"
			className="notification warning-notification"
		>
			<p className="notification__title">{"Warning"}</p>
			<p className="notification__message">{message}</p>
			<Button 
				styleClass="btn-warning-notification" 
				name={"Close"} 
				handleClick={closeAndFocusLastElement}
				shouldFocusOnRender={true}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeWarningNotification()),
  };
};

export const ConnectedWarningNotification = connect(
	null,
	mapDispatchToProps,
)(WarningNotification);
