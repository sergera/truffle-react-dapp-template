import { render } from '@testing-library/react';

import { SuccessToast } from '.';

const mockClose = jest.fn();

// stop typescript from trying to predict injected document
declare var document: any;

test("should not render message if message is empty", () => {
	const emptyMessage = "";
	const props = {message: emptyMessage, close: mockClose};
	render(<SuccessToast {...props} />);

	const rendered = document.getElementsByClassName("toast__message")[0];
	expect(rendered).toBe(undefined);
});

test("should render message if message is non empty", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<SuccessToast {...props} />);

	const rendered = document.getElementsByClassName("toast__message")[0];
	expect(rendered).not.toBe(undefined);
	expect(rendered.innerHTML).toEqual(nonEmptyMessage);
});

test("should disappear after 3 seconds", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<SuccessToast {...props} />);

	const rendered = document.getElementById("success-toast");
	expect(rendered).not.toBe(null);
	setTimeout(() => {
		const renderedAfter3Seconds = document.getElementById("success-toast");
		expect(renderedAfter3Seconds).toBe(null);
	}, 3000);
});
