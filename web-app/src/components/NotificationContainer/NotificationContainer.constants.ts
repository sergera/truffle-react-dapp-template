import { ConnectedSuccessNotification as SuccessNotification } from './SuccessNotification';
import { ConnectedInfoNotification as InfoNotification } from './InfoNotification';
import { ConnectedWarningNotification as WarningNotification } from './WarningNotification';
import { ConnectedErrorNotification as ErrorNotification } from './ErrorNotification';

import { NOTIFICATION_TYPES } from '../../constants';

import { NotificationComponentsMap } from './NotificationContainer.types';

export const NOTIFICATION_COMPONENTS: NotificationComponentsMap = {
	[NOTIFICATION_TYPES.success]: SuccessNotification,
	[NOTIFICATION_TYPES.info]: InfoNotification,
	[NOTIFICATION_TYPES.warning]: WarningNotification,
	[NOTIFICATION_TYPES.error]: ErrorNotification,
};
