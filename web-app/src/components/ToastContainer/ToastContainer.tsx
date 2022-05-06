import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { TOAST_COMPONENTS } from './ToastContainer.constants';

import { RootState } from '../../state';
import { ToastItem } from '../../state/toast/toastSlice.types';
import { ToastContainerProps, ConnectedToast } from './ToastContainer.types';

export function ToastContainer({toasts}: ToastContainerProps) {

	let [currentToast, setCurrentToast] = useState<ToastItem>({type: "", message: ""});
	const oldToastsLength = useRef(toasts.length);

	useEffect(() => {
		if(toasts.length > 0) {
			setCurrentToast(toasts[0]);
		}
		/* update old toasts length after render without triggering a render */
		oldToastsLength.current = toasts.length;
	}, [toasts]);

	let SpecificToast: ConnectedToast;

	if(toasts.length < oldToastsLength.current) {
		/* if a toast was closed, make new object to trigger animation */
		SpecificToast = Object.assign({}, TOAST_COMPONENTS[currentToast.type]);
	} else {
		SpecificToast = TOAST_COMPONENTS[currentToast.type];
	}

	return (
		<>
		{toasts.length > 0 && SpecificToast &&  
			<SpecificToast message={currentToast.message} />
		}
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		toasts: state.toast.queue,
	};
};

export const ConnectedToastContainer = connect(
	mapStateToProps,
)(ToastContainer);
