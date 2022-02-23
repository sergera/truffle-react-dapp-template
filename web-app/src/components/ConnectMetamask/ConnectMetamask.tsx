import { connect } from 'react-redux';

import Button from '../Button/Button';
import MetaMask from '../../utils/MetaMask';

import { State } from '../../state';
import { useEffect } from 'react';

interface ConnectMetamaskProps {
	account: string;
	network: string;
	correctNetwork: boolean;
}

function ConnectMetamask({account, network, correctNetwork}: ConnectMetamaskProps) {

	const connectToBlockchain = () => {
		MetaMask.connect();
	}

	const minifyAddress = (address: string) => {
		let beggining = address.substring(0,6)
		let end = address.slice(-4)
		return beggining + "..." + end
	}

	useEffect(() => {
		console.log("ACCOUNT OR NETWORK CHANGED")
		console.log(`account: ${account}`)
		console.log(`network: ${network}`)
	}, [account, network])

	if(correctNetwork && (account !== "")) {
		// if correct network connected and account retrieved
		return (
			<div className="connect-metamask">
				<p>{minifyAddress(account)}</p>
				<p>{network}</p>
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

const mapStateToProps = (state: State) => {
	return {
		account: state.account,
		network: state.network,
		correctNetwork: state.correctNetwork
	};
}

export default connect(mapStateToProps)(ConnectMetamask);
