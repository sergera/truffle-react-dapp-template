import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { closeSuccessNotification } from '../../../state/notification';

import { KEYS } from '../../../constants';

import { Dispatch } from '../../../state';
import { SuccessNotificationProps } from './SuccessNotification.types';

export const SuccessNotification = ({message, close}: SuccessNotificationProps) => {

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
				id="success-notification"
				className="notification success-notification"
			>
				<h1>{"Success"}</h1>
				<p className="notification__message">{message}</p>
				<Button 
					styleClass="btn-success-notification" 
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
    close: () => dispatch(closeSuccessNotification()),
  };
};

export const ConnectedSuccessNotification = connect(
	null,
	mapDispatchToProps,
)(SuccessNotification);
