import { connect } from 'react-redux';

import { Button } from '../../UI/Button';

import { minify, toCheckSum } from '../../../format/eth/address';

import { connectWallet } from '../../../state/blockchain/wallet';
import { openModal } from '../../../state/modal'

import { MODAL_TYPES } from '../../../constants';

import { RootState, Dispatch } from '../../../state';
import { ConnectMetamaskProps } from './ConnectMetamask.types';

export function ConnectMetamask({
	connect,
	selectChain,
	killswitch, 
	chainName, 
	account,
	/* props to check if only chain not permitted */
	providerIsEnabled,
	providerListenersAreSet,
	chainIsConnected,
	chainIsPermitted,
	chainListenersAreSet,
	accountListenersAreSet,
}: ConnectMetamaskProps) {

	const connectToBlockchain = () => {
		connect();
	}

	const openSelectChain = () => {
		selectChain();
	}

	if(!killswitch) {
		// if correct chain connected and account retrieved
		return (
			<div className="connect-metamask connect-metamask--info">
				<p>{minify(toCheckSum(account))}</p>
				<p>{chainName}</p>
			</div>			
		);
	} else {
		const everythingButChainPermittedOk = (
			providerIsEnabled && providerListenersAreSet &&
			chainIsConnected && !!chainName && chainListenersAreSet &&
			!!account && accountListenersAreSet
		);

		if(everythingButChainPermittedOk && !chainIsPermitted) {
			return (
				<div className="connect-metamask">
					<Button 
						styleClass="btn-lg btn-warning-outline" 
						handleClick={openSelectChain} 
						name={"Wrong Chain"} 
					/>
				</div>
			);
		} else {
			return (
				<div className="connect-metamask">
					<Button 
						styleClass="btn-lg btn-foreground-outline" 
						handleClick={connectToBlockchain} 
						name={"Connect MetaMask"} 
					/>
				</div>
			);
		}
	}
};

const mapStateToProps = (state: RootState) => {
	return {
		killswitch: state.connection.killswitch,
		chainName: state.chain.name,
		account: state.account.address,
		/* props to check if only chain not permitted */
		providerIsEnabled: state.provider.isEnabled,
		providerListenersAreSet: state.provider.listenersAreSet,
		chainIsConnected: state.chain.isConnected,
		chainIsPermitted: state.chain.isPermitted,
		chainListenersAreSet: state.chain.listenersAreSet,
		accountListenersAreSet: state.account.listenersAreSet,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
    connect: () => dispatch(connectWallet()),
		selectChain: () => dispatch(openModal(MODAL_TYPES.selectChain)),
  };
};

export const ConnectedConnectMetamask = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectMetamask);
