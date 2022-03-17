import { connect } from 'react-redux';

import Button from '../UI/Button/Button';

import { ErrorNotificationProps } from './types';
import { RootState, Dispatch } from '../../state/store';
import { closeErrorNotification } from '../../state/errorNotification/errorNotificationSlice';

export const ErrorNotification = ({message, close}: ErrorNotificationProps) => {

	function handleClose(){
		close();
	}

 return (
		<>
		{message && 
			<div 
				id="error-notification"
				className="error-notification"
			>
				<span>{"Error:"}</span>
				<span>{message}</span>
				<Button name={"Close"} callback={handleClose} />
			</div>
		}
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		message: state.errorNotification.message,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    close: () => dispatch(closeErrorNotification()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ErrorNotification);
