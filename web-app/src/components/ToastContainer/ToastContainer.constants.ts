import { ConnectedSuccessToast as SuccessToast } from './SuccessToast';
import { ConnectedInfoToast as InfoToast } from './InfoToast';
import { ConnectedWarningToast as WarningToast } from './WarningToast';
import { ConnectedErrorToast as ErrorToast } from './ErrorToast';

import { TOAST_TYPES } from '../../constants';

import { ToastComponentsMap } from './ToastContainer.types';

export const TOAST_COMPONENTS: ToastComponentsMap = {
	[TOAST_TYPES.success]: SuccessToast,
	[TOAST_TYPES.info]: InfoToast,
	[TOAST_TYPES.warning]: WarningToast,
	[TOAST_TYPES.error]: ErrorToast,
};
