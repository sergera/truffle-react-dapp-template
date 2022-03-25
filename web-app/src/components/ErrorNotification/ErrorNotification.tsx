import { connect } from 'react-redux';

import Button from '../UI/Button/Button';

import { RootState, Dispatch } from '../../state/store';
import { closeErrorNotification } from '../../state/errorNotification/errorNotificationSlice';
import { ErrorNotificationProps } from './ErrorNotification.types';

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
				<h1>{"Error:"}</h1>
				<p className="error-notification__message">{message}</p>
				<Button styleClass="btn-error-notification" name={"Close"} callback={handleClose} />
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
