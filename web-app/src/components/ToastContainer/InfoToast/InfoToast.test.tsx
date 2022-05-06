import { render } from '@testing-library/react';

import { InfoToast } from '.';

const mockClose = jest.fn();

// stop typescript from trying to predict injected document
declare var document: any;

test("should render message", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<InfoToast {...props} />);

	const rendered = document.getElementsByClassName("toast__message")[0];
	expect(rendered).not.toBe(undefined);
	expect(rendered.innerHTML).toEqual(nonEmptyMessage);
});

test("should disappear after 3 seconds", () => {
	const nonEmptyMessage = "test messsage";
	const props = {message: nonEmptyMessage, close: mockClose};
	render(<InfoToast {...props} />);

	const rendered = document.getElementById("info-toast");
	expect(rendered).not.toBe(null);
	setTimeout(() => {
		const renderedAfter3Seconds = document.getElementById("info-toast");
		expect(renderedAfter3Seconds).toBe(null);
	}, 3000);
});
