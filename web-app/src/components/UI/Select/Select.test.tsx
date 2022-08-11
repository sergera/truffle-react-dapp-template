import { useState } from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Select, SelectOption } from '.';

const changeHandler = jest.fn();
const blurHandler = jest.fn();

const SELECT_OPTIONS = {
	one: {label: "value 1", data: {one: "1"}},
	two: {label: "value 2", data: {two: "2"}},
	three: {label: "value 3", data: {three: "3"}},
};

const OPTIONS = [SELECT_OPTIONS.one, SELECT_OPTIONS.two, SELECT_OPTIONS.three];

const TestComponent = () => {
	let [selectOption, setSelectOption] = useState<SelectOption>(SELECT_OPTIONS.one);
	
	let testOnChangeCallback = (option: SelectOption) => {
		setSelectOption(option);
		changeHandler(option);
	}

	let testOnBlurCallback = (option: SelectOption) => {
		setSelectOption(option);
		blurHandler(option);
	}

	return (
		<Select 
			handleChange={testOnChangeCallback} 
			handleBlur={testOnBlurCallback}
			selected={selectOption}
			label="test component"
			options={OPTIONS}
		/>
	);
};

test("gives value to change handler on change", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: SELECT_OPTIONS.one.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(SELECT_OPTIONS.one);
});

test("gives latest value to change handler", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: SELECT_OPTIONS.one.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(SELECT_OPTIONS.one);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: SELECT_OPTIONS.two.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(SELECT_OPTIONS.two);
});

test("gives value to blur handler on blur", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: SELECT_OPTIONS.one.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(SELECT_OPTIONS.one);

	fireEvent.blur(document.getElementsByClassName("select")[0]);

	expect(blurHandler).toHaveBeenCalledWith(SELECT_OPTIONS.one);
});

test("gives latest value to blur handler", () => {
	render(		
		<TestComponent />
	);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: SELECT_OPTIONS.one.label },
	});

	expect(blurHandler).not.toHaveBeenCalled();
	expect(changeHandler).toHaveBeenLastCalledWith(SELECT_OPTIONS.one);

	fireEvent.blur(document.getElementsByClassName("select")[0]);

	expect(blurHandler).toHaveBeenCalledWith(SELECT_OPTIONS.one);

	fireEvent.change(document.getElementsByClassName("select")[0], {
		target: { value: SELECT_OPTIONS.two.label },
	});

	expect(blurHandler).toHaveBeenCalledTimes(1);
	expect(changeHandler).toHaveBeenLastCalledWith(SELECT_OPTIONS.two);

	fireEvent.blur(document.getElementsByClassName("select")[0]);

	expect(blurHandler).toHaveBeenCalledWith(SELECT_OPTIONS.two);
});
