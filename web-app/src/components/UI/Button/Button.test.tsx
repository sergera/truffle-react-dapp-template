import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '.';

test('calls callback on click', () => {
	const mockCallback = jest.fn();

	render(<Button handleClick={mockCallback} name={"test button"}/>);
	userEvent.click(screen.getByRole(/button/i, {name: "test button"}));
	expect(mockCallback).toBeCalled();
});
