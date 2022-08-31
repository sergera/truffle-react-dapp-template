import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { RadioInput, RadioInputOption } from '.';
import { emptyRadioInputOption } from '.';

const changeHandler = jest.fn();

const option1 = {label: "label 1", data: {one: "1"}};
const option2 = {label: "label 2", data: {two: "2"}};
const option3 = {label: "label 3", data: {three: "3"}};
const options = [option1, option2, option3];

const TestComponent = () => {
	let [selected, setSelected] = useState<RadioInputOption>(emptyRadioInputOption());

	let testOnChangeCallback = (option: RadioInputOption) => {
		setSelected(option);
		changeHandler(option);
	}

	return (
		<RadioInput 
			handleChange={testOnChangeCallback}
			value={selected}
			label="test component"
			options={options}
		/>
	);
};

test("gives value to change handler on change", () => {
	render(		
		<TestComponent />
	);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith(option1);
});

test("gives latest value to change handler", () => {
	render(		
		<TestComponent />
	);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith(option1);

	userEvent.click(screen.getByLabelText(option2.label));
	expect(changeHandler).toHaveBeenLastCalledWith(option2);
});
