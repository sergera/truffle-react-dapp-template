import { ConnectedComponent } from 'react-redux';

import { ReactFunctionalComponent } from '../../types';
import { NotificationItem } from "../../state/notification/notificationSlice.types";

export interface NotificationContainerProps {
	notifications: NotificationItem[];
};

export interface NotificationExplicitProps {
	message: string;
	shouldChangeFocusOnClose: boolean;
};

export type ConnectedNotification = ConnectedComponent<ReactFunctionalComponent,NotificationExplicitProps>;

export interface NotificationComponentsMap {
	[key: string]: ConnectedNotification;
};
