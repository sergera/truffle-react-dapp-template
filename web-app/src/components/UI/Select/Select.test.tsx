import { render, fireEvent } from '@testing-library/react';

import { Select, SelectOption } from '.';

const changeHandler = jest.fn();
const blurHandler = jest.fn();

const option1 = {label: "label 1", data: {one: "1"}};
const option2 = {label: "label 2", data: {two: "2"}};
const option3 = {label: "label 3", data: {three: "3"}};
const options = [option1, option2, option3];

const TestComponent = () => {
	let testOnChangeCallback = (option: SelectOption) => {
		changeHandler(option);
	}

	let testOnBlurCallback = (option: SelectOption) => {
		blurHandler(option);
	}

	return (
		<Select 
			handleChange={testOnChangeCallback} 
			handleBlur={testOnBlurCallback}
			label="test component"
			options={options}
		/>
	);
};

test("gives value to change handler on change", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: option1.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(option1);
});

test("gives latest value to change handler", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: option1.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(option1);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: option2.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(option2);
});

test("gives value to blur handler on blur", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: option1.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(option1);

	fireEvent.blur(document.getElementsByClassName("select")[0]);

	expect(blurHandler).toHaveBeenCalledWith(option1);
});

test("gives latest value to blur handler", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: option1.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(option1);

	fireEvent.blur(document.getElementsByClassName("select")[0]);

	expect(blurHandler).toHaveBeenCalledWith(option1);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: option2.label },
	});

	expect(blurHandler).toHaveBeenCalledTimes(1);
	expect(changeHandler).toHaveBeenLastCalledWith(option2);

	fireEvent.blur(document.getElementsByClassName("select")[0]);

	expect(blurHandler).toHaveBeenCalledWith(option2);
});
