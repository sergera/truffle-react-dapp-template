import { useEffect } from 'react';
import { connect } from 'react-redux';

import { closeWarningToast } from '../../../state/toast';

import { Dispatch } from '../../../state';
import { WarningToastProps } from './WarningToast.types';

export const WarningToast = ({message, close}: WarningToastProps) => {

	useEffect(() => {
		const closeTimer = setTimeout(() => close(), 3000);
		return () => clearTimeout(closeTimer);
	}, [close]);

 return (
		<div 
			id="warning-toast"
			className="toast warning-toast"
		>
			<p className="toast__title">{"Warning"}</p>
			<p className="toast__message">{message}</p>	
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeWarningToast()),
  };
};

export const ConnectedWarningToast = connect(
	null,
	mapDispatchToProps,
)(WarningToast);
