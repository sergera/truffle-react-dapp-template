import { useEffect } from 'react';
import { connect } from 'react-redux';

import { closeSuccessToast } from '../../../state/toast';

import { Dispatch } from '../../../state';
import { SuccessToastProps } from './SuccessToast.types';

export const SuccessToast = ({message, close}: SuccessToastProps) => {

	useEffect(() => {
		const closeTimer = setTimeout(() => close(), 3000);
		return () => clearTimeout(closeTimer);
	}, [close]);

 return (
		<div 
			id="success-toast"
			className="toast success-toast"
		>
			<p className="toast__title">{"Success"}</p>
			{message &&
				<p className="toast__message">{message}</p>	
			}
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeSuccessToast()),
  };
};

export const ConnectedSuccessToast = connect(
	null,
	mapDispatchToProps,
)(SuccessToast);
