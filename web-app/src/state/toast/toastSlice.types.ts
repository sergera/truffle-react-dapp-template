export interface ToastItem {
	type: string;
	message: string;
};

export interface ToastSlice {
	queue: ToastItem[];
};
