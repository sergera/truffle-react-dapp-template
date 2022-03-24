import { connect } from 'react-redux';

import Button from '../../UI/Button/Button';

import { connectWallet } from '../../../state/wallet/thunks';
import { minify, toCheckSum } from '../../../utils/format/ethAddress';

import { RootState, Dispatch } from '../../../state/store';
import { ConnectMetamaskProps } from './types';

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

export default connect(mapStateToProps,mapDispatchToProps)(ConnectMetamask);
