import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

const changeHandler = jest.fn();
const blurHandler = jest.fn();

const TestComponent = () => {
	let [onChangeTestText, setOnChangeTestText] = useState("");

	let testOnChangeCallback = (value: string) => {
		setOnChangeTestText(value);
		changeHandler(value);
	}

	let testOnBlurCallback = (value: string) => {
		blurHandler(value);
	}

	return (
		<TextInput 
			handleChange={testOnChangeCallback} 
			handleBlur={testOnBlurCallback}
			value={onChangeTestText} 
			name="test component"
			placeholder="test input"
		/>
	);
};

describe("gives value to callback", () => {
	test("on change", () => {
		render(		
			<TestComponent />
		);
	
		const testText = "testing component now";
		userEvent.type(screen.getByRole(/text/i), testText);
		expect(screen.getByDisplayValue(testText)).toHaveAttribute("name", "test component");
		expect(blurHandler).not.toHaveBeenCalled();
		expect(changeHandler).toHaveBeenLastCalledWith(testText);
	});

	test("on blur", () => {
		render(<TestComponent/>);

		const testText = "testing component now";
		userEvent.type(screen.getByRole(/text/i), testText);
		expect(blurHandler).not.toHaveBeenCalled();
		userEvent.tab();
		expect(blurHandler).toHaveBeenCalledTimes(1);
		expect(blurHandler).toHaveBeenCalledWith(testText);
	});
})
