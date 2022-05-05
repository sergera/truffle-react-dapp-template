import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { closeErrorNotification } from '../../../state/notification';

import { KEYS } from '../../../constants';

import { Dispatch } from '../../../state';
import { ErrorNotificationProps } from './ErrorNotification.types';

export const ErrorNotification = ({message, close}: ErrorNotificationProps) => {

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
		<>
		{message && 
			<div 
				id="error-notification"
				className="notification error-notification"
			>
				<h1>{"Error"}</h1>
				<p className="notification__message">{message}</p>
				<Button 
					styleClass="btn-error-notification" 
					name={"Close"} 
					handleClick={() => close()}
					shouldFocusOnRender={true}
				/>
			</div>
		}
		</>
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
