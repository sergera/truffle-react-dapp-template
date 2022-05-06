import { useEffect } from 'react';
import { connect } from 'react-redux';

import { closeInfoToast } from '../../../state/toast';

import { Dispatch } from '../../../state';
import { InfoToastProps } from './InfoToast.types';

export const InfoToast = ({message, close}: InfoToastProps) => {

	useEffect(() => {
		const closeTimer = setTimeout(() => close(), 3000);
		return () => clearTimeout(closeTimer);
	}, [close]);

 return (
		<div 
			id="info-toast"
			className="toast info-toast"
		>
			<p className="toast__title">{"FYI"}</p>
			<p className="toast__message">{message}</p>	
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeInfoToast()),
  };
};

export const ConnectedInfoToast = connect(
	null,
	mapDispatchToProps,
)(InfoToast);
