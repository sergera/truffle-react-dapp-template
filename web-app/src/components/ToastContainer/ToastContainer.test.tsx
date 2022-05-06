import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { ToastContainer } from '.';

import { getNewStore } from '../../test';

import { TOAST_TYPES } from '../../constants';

import { Store } from '../../state';

// stop typescript from trying to predict injected document
declare var document: any;

const successToastId = "success-toast";
const successToastItem = {
	type: TOAST_TYPES.success,
	message: "this is a success toast!",
};

const infoToastId = "info-toast";
const infoToastItem = {
	type: TOAST_TYPES.info,
	message: "this is an info toast!",
};

const warningToastId = "warning-toast";
const warningToastItem = {
	type: TOAST_TYPES.warning,
	message: "this is a warning toast!",
};

const errorToastId = "error-toast";
const errorToastItem = {
	type: TOAST_TYPES.error,
	message: "this is an error toast!",
};

const nonExistantToast = {
	type: "this type doesn't exist",
	message: "this toast doesn't exist",
};

let store: Store;

beforeEach(() => {
	store = getNewStore();
});

test("should not render anything is toasts list is empty", () => {
	render(
		<Provider store={store}>
			<ToastContainer toasts={[]} />
		</Provider>
	);
	const successToastElement = document.getElementById(successToastId);
	const infoToastElement = document.getElementById(infoToastId);
	const warningToastElement = document.getElementById(warningToastId);
	const errorToastElement = document.getElementById(errorToastId);

	expect(successToastElement).toBe(null);
	expect(infoToastElement).toBe(null);
	expect(warningToastElement).toBe(null);
	expect(errorToastElement).toBe(null);
});

test("should not render anything if toast type is non existant", () => {
	render(
		<Provider store={store}>
			<ToastContainer toasts={[nonExistantToast]} />
		</Provider>
	);
	const successToastElement = document.getElementById(successToastId);
	const infoToastElement = document.getElementById(infoToastId);
	const warningToastElement = document.getElementById(warningToastId);
	const errorToastElement = document.getElementById(errorToastId);

	expect(successToastElement).toBe(null);
	expect(infoToastElement).toBe(null);
	expect(warningToastElement).toBe(null);
	expect(errorToastElement).toBe(null);
});

test("should render toast if existant toast is the first element in toasts list", () => {
	render(
		<Provider store={store}>
			<ToastContainer toasts={[successToastItem]} />
		</Provider>
	);
	const successToastElement = document.getElementById(successToastId);

	expect(successToastElement).not.toBe(null);
});

test("should render only the first toast in list", () => {
	render(
		<Provider store={store}>
			<ToastContainer toasts={[
				infoToastItem,
				errorToastItem,
				successToastItem,
				warningToastItem
			]} />
		</Provider>
	);
	const successToastElement = document.getElementById(successToastId);
	const infoToastElement = document.getElementById(infoToastId);
	const warningToastElement = document.getElementById(warningToastId);
	const errorToastElement = document.getElementById(errorToastId);

	expect(successToastElement).toBe(null);
	expect(infoToastElement).not.toBe(null);
	expect(warningToastElement).toBe(null);
	expect(errorToastElement).toBe(null);
});
