import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { connectWallet } from '../../../state/wallet';
import { minify, toCheckSum } from '../../../format/eth/address';

import { RootState, Dispatch } from '../../../state';
import { ConnectMetamaskProps } from './ConnectMetamask.types';

export function ConnectMetamask({connect, providerOk, chain, account}: ConnectMetamaskProps) {

	const connectToBlockchain = () => {
		connect();
	}

	if(providerOk && chain.isPermitted && (account !== "")) {
		// if correct chain connected and account retrieved
		return (
			<div className="connect-metamask connect-metamask--info">
				<p>{minify(toCheckSum(account))}</p>
				<p>{chain.name}</p>
			</div>			
		);
	} else {
		return (
			<div className="connect-metamask">
				<Button styleClass="btn-lg btn-foreground-outline" callback={connectToBlockchain} name={"Connect MetaMask"} />
			</div>
		);
	}
};

const mapStateToProps = (state: RootState) => {
	return {
		providerOk: state.provider.statusOk,
		chain: state.chain,
		account: state.account.address,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
    connect: () => dispatch(connectWallet()),
  };
};

export const ConnectedConnectMetamask = connect(mapStateToProps,mapDispatchToProps)(ConnectMetamask);
