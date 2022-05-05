export interface NotificationItem {
	type: string;
	message: string;
};

export interface NotificationSlice {
	queue: NotificationItem[];
};
