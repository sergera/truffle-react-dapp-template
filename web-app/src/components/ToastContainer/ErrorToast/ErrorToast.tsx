import { useEffect } from 'react';
import { connect } from 'react-redux';

import { closeErrorToast } from '../../../state/toast';

import { Dispatch } from '../../../state';
import { ErrorToastProps } from './ErrorToast.types';

export const ErrorToast = ({message, close}: ErrorToastProps) => {

	useEffect(() => {
		const closeTimer = setTimeout(() => close(), 3000);
		return () => clearTimeout(closeTimer);
	}, [close]);

 return (
		<div 
			id="error-toast"
			className="toast error-toast"
		>
			<p className="toast__title">{"Error"}</p>
			{message &&
				<p className="toast__message">{message}</p>	
			}
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeErrorToast()),
  };
};

export const ConnectedErrorToast = connect(
	null,
	mapDispatchToProps,
)(ErrorToast);
