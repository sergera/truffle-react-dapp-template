import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { NotificationContainer } from '.';

import { getNewStore } from '../../test';

import { NOTIFICATION_TYPES } from '../../constants';

import { Store } from '../../state';

// stop typescript from trying to predict injected document
declare var document: any;

const successNotificationId = "success-notification";
const successNotificationItem = {
	type: NOTIFICATION_TYPES.success,
	message: "this is a success notification!",
};

const infoNotificationId = "info-notification";
const infoNotificationItem = {
	type: NOTIFICATION_TYPES.info,
	message: "this is an info notification!",
};

const warningNotificationId = "warning-notification";
const warningNotificationItem = {
	type: NOTIFICATION_TYPES.warning,
	message: "this is a warning notification!",
};

const errorNotificationId = "error-notification";
const errorNotificationItem = {
	type: NOTIFICATION_TYPES.error,
	message: "this is an error notification!",
};

const nonExistantNotification = {
	type: "this type doesn't exist",
	message: "this notification doesn't exist",
};

let store: Store;

beforeEach(() => {
	store = getNewStore();
});

test("should not render anything is notifications list is empty", () => {
	render(
		<Provider store={store}>
			<NotificationContainer notifications={[]} />
		</Provider>
	);
	const successNotificationElement = document.getElementById(successNotificationId);
	const infoNotificationElement = document.getElementById(infoNotificationId);
	const warningNotificationElement = document.getElementById(warningNotificationId);
	const errorNotificationElement = document.getElementById(errorNotificationId);

	expect(successNotificationElement).toBe(null);
	expect(infoNotificationElement).toBe(null);
	expect(warningNotificationElement).toBe(null);
	expect(errorNotificationElement).toBe(null);
});

test("should not render anything if notification type is non existant", () => {
	render(
		<Provider store={store}>
			<NotificationContainer notifications={[nonExistantNotification]} />
		</Provider>
	);
	const successNotificationElement = document.getElementById(successNotificationId);
	const infoNotificationElement = document.getElementById(infoNotificationId);
	const warningNotificationElement = document.getElementById(warningNotificationId);
	const errorNotificationElement = document.getElementById(errorNotificationId);

	expect(successNotificationElement).toBe(null);
	expect(infoNotificationElement).toBe(null);
	expect(warningNotificationElement).toBe(null);
	expect(errorNotificationElement).toBe(null);
});

test("should render notification if existant notification is the first element in notifications list", () => {
	render(
		<Provider store={store}>
			<NotificationContainer notifications={[successNotificationItem]} />
		</Provider>
	);
	const successNotificationElement = document.getElementById(successNotificationId);

	expect(successNotificationElement).not.toBe(null);
});

test("should render only the first notification in list if there are no error notifications", () => {
	render(
		<Provider store={store}>
			<NotificationContainer notifications={[
				infoNotificationItem,
				successNotificationItem,
				warningNotificationItem
			]} />
		</Provider>
	);
	const successNotificationElement = document.getElementById(successNotificationId);
	const infoNotificationElement = document.getElementById(infoNotificationId);
	const warningNotificationElement = document.getElementById(warningNotificationId);

	expect(successNotificationElement).toBe(null);
	expect(infoNotificationElement).not.toBe(null);
	expect(warningNotificationElement).toBe(null);
});

test("should render error notification even if it isn't the first in the list", () => {
	render(
		<Provider store={store}>
			<NotificationContainer notifications={[
				infoNotificationItem,
				successNotificationItem,
				errorNotificationItem,
				warningNotificationItem
			]} />
		</Provider>
	);
	const successNotificationElement = document.getElementById(successNotificationId);
	const infoNotificationElement = document.getElementById(infoNotificationId);
	const warningNotificationElement = document.getElementById(warningNotificationId);
	const errorNotificationElement = document.getElementById(errorNotificationId);

	expect(successNotificationElement).toBe(null);
	expect(infoNotificationElement).toBe(null);
	expect(warningNotificationElement).toBe(null);
	expect(errorNotificationElement).not.toBe(null);
});

