import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '.';

test('gives value to callback', () => {
	const TestComponent = () => {
		let [testText, setTestText] = useState("");

		let testCallback = (value: string) => {
			setTestText(value);
		}

		return (
			<Input 
				callback={testCallback} 
				value={testText} 
				name="test component"
				placeholder="test input"
				isValid={true}
				rules={["validation rules array"]}
			/>
		);
	}

	render(<TestComponent/>);
	
	const testText = "testing component now";
	userEvent.type(screen.getByRole(/text/i), testText);
	expect(screen.getByDisplayValue(testText)).toHaveAttribute("name", "test component");
});
