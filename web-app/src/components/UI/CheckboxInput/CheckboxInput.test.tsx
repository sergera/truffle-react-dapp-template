import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxInput, CheckboxInputOption } from '.';

const changeHandler = jest.fn();

const option1 = {label: "label 1", data: {one: "1"}};
const option2 = {label: "label 2", data: {two: "2"}};
const option3 = {label: "label 3", data: {three: "3"}};
const options = [option1, option2, option3];

const TestComponent = () => {
	let testOnChangeCallback = (options: CheckboxInputOption[]) => {
		changeHandler(options);
	}

	return (
		<CheckboxInput 
			handleChange={testOnChangeCallback} 
			label="test component"
			options={options}
		/>
	);
};

test("gives value to change handler when box checked", () => {
	render(		
		<TestComponent />
	);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1]);
});

test("gives multiple values to change handler when multiple boxes checked", () => {
	render(		
		<TestComponent />
	);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1]);

	userEvent.click(screen.getByLabelText(option2.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option2]);

	userEvent.click(screen.getByLabelText(option3.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option2,option3]);
});

test("removes value if box unchecked", () => {
	render(		
		<TestComponent />
	);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1]);

	userEvent.click(screen.getByLabelText(option2.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option2]);

	userEvent.click(screen.getByLabelText(option3.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option2,option3]);

	userEvent.click(screen.getByLabelText(option3.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option2]);

	userEvent.click(screen.getByLabelText(option2.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1]);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith([]);
});

test("maintains order of values added", () => {
	render(		
		<TestComponent />
	);

	userEvent.click(screen.getByLabelText(option2.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option2]);

	userEvent.click(screen.getByLabelText(option3.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option2,option3]);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option2,option3,option1]);
});

test("maintains order of values removed", () => {
	render(		
		<TestComponent />
	);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1]);

	userEvent.click(screen.getByLabelText(option2.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option2]);

	userEvent.click(screen.getByLabelText(option3.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option2,option3]);

	userEvent.click(screen.getByLabelText(option2.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option1,option3]);

	userEvent.click(screen.getByLabelText(option1.label));
	expect(changeHandler).toHaveBeenLastCalledWith([option3]);

	userEvent.click(screen.getByLabelText(option3.label));
	expect(changeHandler).toHaveBeenLastCalledWith([]);
});
