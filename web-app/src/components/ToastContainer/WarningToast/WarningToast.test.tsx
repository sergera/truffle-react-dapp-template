import { render } from '@testing-library/react';

import { WarningToast } from '.';

const mockClose = jest.fn();

// stop typescript from trying to predict injected document
declare var document: any;

test("should render message", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<WarningToast {...props} />);

	const rendered = document.getElementsByClassName("toast__message")[0];
	expect(rendered).not.toBe(undefined);
	expect(rendered.innerHTML).toEqual(nonEmptyMessage);
});

test("should disappear after 3 seconds", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<WarningToast {...props} />);

	const rendered = document.getElementById("warning-toast");
	expect(rendered).not.toBe(null);
	setTimeout(() => {
		const renderedAfter3Seconds = document.getElementById("warning-toast");
		expect(renderedAfter3Seconds).toBe(null);
	}, 3000);
});
