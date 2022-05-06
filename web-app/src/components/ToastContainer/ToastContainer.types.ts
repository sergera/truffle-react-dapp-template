import { ConnectedComponent } from 'react-redux';

import { ReactFunctionalComponent } from '../../types';
import { ToastItem } from "../../state/toast/toastSlice.types";

export interface ToastContainerProps {
	toasts: ToastItem[];
};

export interface ToastExplicitProps {
	message: string;
};

export type ConnectedToast = ConnectedComponent<ReactFunctionalComponent,ToastExplicitProps>;

export interface ToastComponentsMap {
	[key: string]: ConnectedToast;
};
