import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { closeWarningNotification } from '../../../state/notification';

import { KEYS } from '../../../constants';

import { Dispatch } from '../../../state';
import { SuccessNotificationProps } from './WarningNotification.types';

export const WarningNotification = ({message, close}: SuccessNotificationProps) => {

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
				handleClick={() => close()}
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
