import { 
	connect 
} from 'react-redux';

import { 
	Button 
} from '../../UI/Button';

import { 
	minify, 
	toCheckSum 
} from '../../../format/eth/address';

import { 
	connectWallet 
} from '../../../state/blockchain/wallet';
import { 
	openModal 
} from '../../../state/modal'

import { 
	RootState, 
	Dispatch 
} from '../../../state';
import { 
	ConnectMetamaskProps 
} from './ConnectMetamask.types';

export function ConnectMetamask({
	connect,
	selectChain,
	connectionStatusOk, 
	chainName, 
	account,
	/* props to check if only chain not permitted */
	providerEnabled,
	providerListenersSet,
	chainConnected,
	chainPermitted,
	chainListenersSet,
	accountListenersSet,
}: ConnectMetamaskProps) {

	const connectToBlockchain = () => {
		connect();
	}

	const openSelectChain = () => {
		selectChain();
	}

	if(connectionStatusOk) {
		// if correct chain connected and account retrieved
		return (
			<div className="connect-metamask connect-metamask--info">
				<p>{minify(toCheckSum(account))}</p>
				<p>{chainName}</p>
			</div>			
		);
	} else {
		const everythingButChainPermittedOk = (
			providerEnabled && providerListenersSet &&
			chainConnected && !!chainName && chainListenersSet &&
			!!account && accountListenersSet
		);

		if(everythingButChainPermittedOk && !chainPermitted) {
			return (
				<div className="connect-metamask">
					<Button 
						styleClass="btn-lg btn-warning-outline" 
						callback={openSelectChain} 
						name={"Wrong Chain"} 
					/>
				</div>
			);
		} else {
			return (
				<div className="connect-metamask">
					<Button 
						styleClass="btn-lg btn-foreground-outline" 
						callback={connectToBlockchain} 
						name={"Connect MetaMask"} 
					/>
				</div>
			);
		}
	}
};

const mapStateToProps = (state: RootState) => {
	return {
		connectionStatusOk: state.connection.statusOk,
		chainName: state.chain.name,
		account: state.account.address,
		/* props to check if only chain not permitted */
		providerEnabled: state.provider.isEnabled,
		providerListenersSet: state.provider.listenersSet,
		chainConnected: state.chain.isConnected,
		chainPermitted: state.chain.isPermitted,
		chainListenersSet: state.chain.listenersSet,
		accountListenersSet: state.account.listenersSet,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
    connect: () => dispatch(connectWallet()),
		selectChain: () => dispatch(openModal("SELECT_CHAIN")),
  };
};

export const ConnectedConnectMetamask = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectMetamask);
