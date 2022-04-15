import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConnectMetamask } from '.';

import * as ethAddress from '../../../format/eth/address/address';

const mockConnect = jest.fn();
const mockSelectChain = jest.fn();

const propsAllOk = {
	connect: mockConnect,
	selectChain: mockSelectChain,
	killswitch: false,
	chainName: "fake chain name",
	account: "fake account address",
	providerEnabled: true,
	providerListenersSet: true,
	chainConnected: true,
	chainPermitted: true,
	chainListenersSet: true,
	accountListenersSet: true,
};

const propsAllNotOk = {
	connect: mockConnect,
	selectChain: mockSelectChain,
	killswitch: true,
	chainName: "",
	account: "",
	providerEnabled: false,
	providerListenersSet: false,
	chainConnected: false,
	chainPermitted: false,
	chainListenersSet: false,
	accountListenersSet: false,
};

beforeEach(() => {			
	jest.spyOn(ethAddress, 'minify').mockImplementation((str) => str);
	jest.spyOn(ethAddress, 'toCheckSum').mockImplementation((str) => str);
});

test("should call connect on button click", () => {;
	render(<ConnectMetamask {...propsAllNotOk}/>);

	expect(screen.getByRole(/button/i).innerHTML).toMatch(/connect metamask/i);
	userEvent.click(screen.getByRole(/button/i));
	expect(mockConnect).toBeCalled();
});

describe("should show connect button", () => {
	test("if killswitch", () => {
		const props = {
			...propsAllOk,
			killswitch: true,
		};

		render(<ConnectMetamask {...props}/>);

		expect(screen.getByRole(/button/i).innerHTML).toMatch(/connect metamask/i);
		expect(screen.queryByText(/test chain/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/test account/i)).not.toBeInTheDocument();
	});
});

describe("should show wrong chain button", () => {
	test("if everything but killswitch and chain permitted ok", () => {
		const props = {
			...propsAllOk,
			killswitch: true,
			chainPermitted: false,
		};

		render(<ConnectMetamask {...props}/>);

		expect(screen.getByRole(/button/i).innerHTML).toMatch(/wrong chain/i);
		expect(screen.queryByText(/test chain/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/test account/i)).not.toBeInTheDocument();
	})
})

describe("should show connected", () => {
	test("if not killswitch", () => {
		const props = {
			...propsAllNotOk,
			chainName: "only connection status chain name",
			account: "only connection status account",
			killswitch: false,
		};

		render(<ConnectMetamask {...props}/>);
	
		expect(screen.queryByText(/button/i)).not.toBeInTheDocument();
		expect(screen.getByText(props.chainName)).toBeInTheDocument();
		expect(screen.getByText(props.account)).toBeInTheDocument();
	});
});
