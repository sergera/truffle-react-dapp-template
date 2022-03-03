import { connect } from 'react-redux';

import store from '../../state/store';
import { RootState } from '../../state';
import { connectWallet } from '../../state/wallet/thunks';

import Button from '../Button/Button';

interface ConnectMetamaskProps {
	providerOk: boolean,
	chain: {
		name: string,
		isPermitted: boolean
	},
	account: string,
};

function ConnectMetamask({providerOk, chain, account}: ConnectMetamaskProps) {

	const connectToBlockchain = () => {
		store.dispatch(connectWallet());
	}

	const minifyAddress = (address: string) => {
		let beggining = address.substring(0,6);
		let end = address.slice(-4);
		return beggining + "..." + end;
	}

	if(providerOk && chain.isPermitted && (account !== "")) {
		// if correct chain connected and account retrieved
		return (
			<div className="connect-metamask">
				<p>{minifyAddress(account)}</p>
				<p>{chain.name}</p>
			</div>			
		);
	} else {
		return (
			<div className="connect-metamask">
				<Button callback={connectToBlockchain} name={"Connect MetaMask"} />
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		providerOk: state.provider.statusOk,
		chain: state.chain,
		account: state.account.address,
	};
};

export default connect(mapStateToProps)(ConnectMetamask);
