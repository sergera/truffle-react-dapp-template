import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WarningNotification } from '.';

const mockClose = jest.fn();

// stop typescript from trying to predict injected document
declare var document: any;

test("should render message", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<WarningNotification {...props} />);

	const renderedMessage = document.getElementsByClassName("notification__message")[0];
	expect(renderedMessage.innerHTML).toBe(nonEmptyMessage);
});

test("should call close on button click", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<WarningNotification {...props} />);
	const rendered = document.getElementById("warning-notification");
	expect(rendered).not.toBe(null);

	const closeButton = document.getElementsByClassName("button")[0];
	userEvent.click(closeButton);
	expect(mockClose).toBeCalledTimes(1);
});
