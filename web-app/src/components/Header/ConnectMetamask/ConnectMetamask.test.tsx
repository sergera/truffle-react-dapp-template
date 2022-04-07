import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConnectMetamask } from '.';

import * as ethAddress from '../../../format/eth/address/address';

const chainOk = {isConnected: true, isPermitted: true,	name: "test chain"};
const chainNotOk = {isConnected: false, isPermitted: false,	name: "test chain"};
const accountOk = "test account";
const accountNotOk = "";

const mockConnect = jest.fn();

beforeEach(() => {			
	jest.spyOn(ethAddress, 'minify').mockImplementation((str) => str);
	jest.spyOn(ethAddress, 'toCheckSum').mockImplementation((str) => str);
});

test("should call connect on button click", () => {
	const props = {connect: mockConnect, providerOk: false, chain: chainOk, account: accountOk};
	render(<ConnectMetamask {...props}/>);

	expect(screen.getByRole(/button/i).innerHTML).toMatch(/connect metamask/i);
	userEvent.click(screen.getByRole(/button/i));
	expect(mockConnect).toBeCalled();
});

describe("should not show connected", () => {
	test("if metamask: is not installed, is not provider, or is not connected", () => {
		const props = {connect: mockConnect, providerOk: false, chain: chainOk, account: accountOk};
		render(<ConnectMetamask {...props}/>);

		expect(screen.getByRole(/button/i).innerHTML).toMatch(/connect metamask/i);
		expect(screen.queryByText(/test chain/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/test account/i)).not.toBeInTheDocument();
	});

	test("if chain is not permitted", () => {
		const props = {connect: mockConnect, providerOk: true, chain: chainNotOk, account: accountOk};
		render(<ConnectMetamask {...props}/>);

		expect(screen.getByRole(/button/i).innerHTML).toMatch(/connect metamask/i);
		expect(screen.queryByText(/test chain/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/test account/i)).not.toBeInTheDocument();
	});

	test("if account is empty string", () => {
		const props = {connect: mockConnect, providerOk: true, chain: chainOk, account: accountNotOk};
		render(<ConnectMetamask {...props}/>);

		expect(screen.getByRole(/button/i).innerHTML).toMatch(/connect metamask/i);
		expect(screen.queryByText(/test chain/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/test account/i)).not.toBeInTheDocument();
	});
});

describe("should show connected", () => {
	test("if provider, chain, and account are ok", () => {
		const props = {connect: mockConnect, providerOk: true, chain: chainOk, account: accountOk};
		render(<ConnectMetamask {...props}/>);
	
		expect(screen.queryByText(/button/i)).not.toBeInTheDocument();
		expect(screen.getByText(/test chain/i)).toBeInTheDocument();
		expect(screen.getByText(/test account/i)).toBeInTheDocument();
	});
});
