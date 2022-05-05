import { render } from '@testing-library/react';

import { SuccessNotification } from '.';

const mockClose = jest.fn();

// stop typescript from trying to predict injected document
declare var document: any;

test("should not render if message is empty", () => {
	const emptyMessage = "";
	const props = {message: emptyMessage, close: mockClose};
	render(<SuccessNotification {...props} />);

	const rendered = document.getElementById("success-notification");
	expect(rendered).toBe(null);
});

test("should render if message is non empty", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<SuccessNotification {...props} />);

	const rendered = document.getElementById("success-notification");
	expect(rendered).not.toBe(null);
});
