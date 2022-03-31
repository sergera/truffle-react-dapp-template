import { render } from '@testing-library/react';

import { ModalContainer, MODAL_COMPONENTS } from '.';

const mockClose = jest.fn();

// stop typescript from trying to predict injected document
declare var document: any;

describe("should not render", () => {
	test("if type is empty", () => {
		const emptyType = "";
		const props = {type: emptyType, close: mockClose};
		render(<ModalContainer {...props} />);
	
		const rendered = document.getElementById("modal-container");
		expect(rendered).toBe(null);
	});
	
	test("if type is non existant", () => {
		const nonExistantType = "test type";
		const props = {type: nonExistantType, close: mockClose};
		render(<ModalContainer {...props} />);
	
		const rendered = document.getElementById("modal-container");
		expect(rendered).toBe(null);
	});
});

describe("should render", () => {
	test("if type is pre defined", () => {
		const preDefinedType = Object.keys(MODAL_COMPONENTS)[0];
		const props = {type: preDefinedType, close: mockClose};
		render(<ModalContainer {...props} />);
	
		const rendered = document.getElementById("modal-container");
		expect(rendered).not.toBe(null);
	});
});
