import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { useAfterRender } from '../../hooks';

import { NOTIFICATION_COMPONENTS } from './NotificationContainer.constants';
import { NOTIFICATION_TYPES } from '../../constants';

import { RootState } from '../../state';
import { NotificationItem } from '../../state/notification/notificationSlice.types';
import { NotificationContainerProps, ConnectedNotification } from './NotificationContainer.types';

export function NotificationContainer({notifications}: NotificationContainerProps) {

	let [currentNotification, setCurrentNotification] = useState<NotificationItem>({type: "", message: ""});
	const oldNotificationsLength = useRef(notifications.length);

	useEffect(() => {
		if(notifications.length > 0) {
			let errorInNotifications = notifications.find((notification) => notification.type === NOTIFICATION_TYPES.error);
			let newNotification = errorInNotifications ? errorInNotifications : notifications[0];
			setCurrentNotification(newNotification);
		}
	}, [notifications]);

	useAfterRender(() => {
		/* update old notifications length after render without triggering a render */
		oldNotificationsLength.current = notifications.length;
	});

	let SpecificNotification: ConnectedNotification;
	if(notifications.length < oldNotificationsLength.current) {
		/* if a notification was closed, make new object to trigger slide-in animation */
		SpecificNotification = Object.assign({}, NOTIFICATION_COMPONENTS[currentNotification.type]);
	} else {
		SpecificNotification = NOTIFICATION_COMPONENTS[currentNotification.type];
	}
	
	return (
		<>
		{notifications.length > 0 && SpecificNotification &&  
			<SpecificNotification message={currentNotification.message} />
		}
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		notifications: state.notification.queue,
	};
};

export const ConnectedNotificationContainer = connect(
	mapStateToProps,
)(NotificationContainer);
