import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

test('gives value to callback', () => {
	const TestComponent = () => {
		let [testText, setTestText] = useState("");

		let testCallback = (value: string) => {
			setTestText(value);
		}

		return (
			<Input callback={testCallback} value={testText} name="test component" />
		);
	}

	render(<TestComponent/>);
	
	const testText = "testing component now";
	userEvent.type(screen.getByRole(/input/i), testText);
	expect(screen.getByDisplayValue(testText)).toHaveAttribute("name", "test component");
});
